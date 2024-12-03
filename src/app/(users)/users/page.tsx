/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';

import Link from 'next/link';
import Image from 'next/image';
import { User } from '@/types/index';
import { useRouter } from 'next/navigation';
import { useToast } from "@/hooks/use-toast";
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { FC, useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import AlertInfo from '@/components/customs/alert-info';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import BackHomeButton from '@/components/customs/buttons/back-home-button';
import { createUser, deleteUser, fetchUsers, patchUser, updateUser } from './lib/data';
import { Dialog, DialogContent, DialogHeader, DialogFooter, DialogClose } from '@/components/ui/dialog';
import { AlertDialog, AlertDialogTrigger, AlertDialogContent, AlertDialogAction, AlertDialogCancel } from '@/components/ui/alert-dialog';

const UsersPage: FC = () => {
  const [page, setPage] = useState(1);
  const [users, setUsers] = useState<User[]>([]);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [showUpdateDialog, setShowUpdateDialog] = useState(false);
  const [showPatchDialog, setShowPatchDialog] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [name, setName] = useState('');
  const [job, setJob] = useState('');
  const { toast } = useToast()
  const router = useRouter();

  // Fetch users data based on page number
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await fetchUsers(page);
        setUsers(response.data);
        setTotalPages(response.total_pages);
      } catch (err) {
        console.error(err);
        setError('Failed to load users');
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [page]);

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    setIsLoggedIn(!!storedToken);
  }, []);

  const handleLogin = () => {
    router.push('/login');
  };

  const handleRegister = () => {
    router.push('/register');
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
  };

  const handleNextPage = () => {
    if (page < totalPages) setPage((prev) => prev + 1);
  };

  const handlePrevPage = () => {
    if (page > 1) setPage((prev) => prev - 1);
  };

  const handlePageChange = (pageNumber: number) => {
    setPage(pageNumber);
  };

  const handleCreateUser = async () => {
    try {
      const newUser = await createUser(name, job);
      setUsers((prevUsers) => [...prevUsers, newUser]);
      setShowCreateDialog(false);
      setName('');
      setJob('');
    } catch (err) {
      console.error(err);
      setError('Failed to create user');
    }
  };

  const handleUpdateUser = async () => {
    if (currentUser) {
      try {
        const updatedUser = await updateUser(currentUser.id, name, job);
        setUsers((prevUsers) => prevUsers.map((user) => (user.id === updatedUser.id ? updatedUser : user)));
        setShowUpdateDialog(false);
        setName('');
        setJob('');
      } catch (err) {
        console.error(err);
        setError('Failed to update user');
      }
    }
  };

  const handlePatchUser = async () => {
    if (currentUser) {
      try {
        const updatedUser = await patchUser(currentUser.id, name, job);
        setUsers((prevUsers) => prevUsers.map((user) => (user.id === updatedUser.id ? updatedUser : user)));
        setShowPatchDialog(false);
        setName('');
        setJob('');
      } catch (err) {
        console.error(err);
        setError('Failed to update user');
      }
    }
  };

  const handleDeleteUser = async () => {
    if (currentUser) {
      try {
        await deleteUser(currentUser.id);
        setUsers((prevUsers) => prevUsers.filter((user) => user.id !== currentUser.id));
        setShowDeleteDialog(false);
        setCurrentUser(null);
      } catch (err) {
        console.error(err);
        setError('Failed to delete user');
      }
    }
  };

  if (isLoading) return <div className="text-center py-8">Loading...</div>;
  if (error) return <div className="text-center py-8">{error}</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-semibold text-center mb-6">Users List</h1>
      <BackHomeButton />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
        <div className="flex space-x-4 justify-start">
          <Button
            variant="default"
            className="bg-green-600 text-white font-medium hover:bg-green-500"
            onClick={() => setShowCreateDialog(true)}>
            Create
          </Button>
        </div>
        <div className="flex justify-end space-x-4">
          {!isLoggedIn ? (
            <>
              <Button onClick={handleRegister} variant="outline">
                Register
              </Button>
              <Button onClick={handleLogin} variant="outline">
                Login
              </Button>
            </>
          ) : (
            <Button onClick={() => {
              handleLogout()
              toast({
                title: "User Logged Out",
                description: "You have been successfully logged out.",
              })
            }} variant="destructive">
              Logout
            </Button>
          )}
        </div>
      </div>

      {/* Users list grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {users?.map((user) => (
          <div key={user.id} className="bg-white p-4 rounded-lg shadow-md hover:shadow-xl transition duration-200 cursor-pointer">
            <div className="flex flex-col items-center">
              <Link href={`/users/${user.id}`} className="flex flex-col items-center">
                <Image
                  src={user.avatar}
                  alt={user.first_name}
                  width={100}
                  height={100}
                  className="rounded-full mb-4"
                />
                <h2 className="text-lg font-semibold">{user.first_name} {user.last_name}</h2>
                <p className="text-sm text-gray-500">{user.email}</p>
              </Link>

              {/* Buttons for Update and Delete */}
              <div className="mt-4 space-x-2">
                <Button variant="outline" onClick={() => { setCurrentUser(user); setShowUpdateDialog(true); }}>
                  Update (PUT)
                </Button>
                <Button variant="outline" onClick={() => { setCurrentUser(user); setShowPatchDialog(true); }}>
                  Update (PATCH)
                </Button>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button
                      variant="outline"
                      className="border-red-500 text-red-500 hover:bg-red-500 hover:text-white"
                      onClick={() => { setCurrentUser(user) }}
                    >
                      Delete
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <h3 className="text-xl">Are you sure?</h3>
                    <AlertInfo />
                    <DialogFooter>
                      <AlertDialogCancel onClick={() => setShowDeleteDialog(false)}>
                        Cancel
                      </AlertDialogCancel>
                      <AlertDialogAction onClick={() => {
                        handleDeleteUser()
                        toast({
                          title: "User Deleted",
                          description: `User ${user.first_name} ${user.last_name} has been deleted.`,
                        })
                      }} className="bg-red-600 text-white">
                        Yes, Delete
                      </AlertDialogAction>
                    </DialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-center items-center mt-6 space-x-2">
        <Button variant="outline" onClick={handlePrevPage} disabled={page === 1} size="icon">
          <ChevronLeft />
        </Button>

        {/* Pagination Buttons */}
        {Array.from({ length: totalPages }, (_, index) => (
          <Button
            key={index}
            variant={page === index + 1 ? "default" : "outline"}
            onClick={() => handlePageChange(index + 1)}
            className={`w-10 py-2 text-white ${page === index + 1 ? 'bg-blue-600' : 'bg-white text-blue-500 border-blue-500 hover:bg-blue-100'} font-semibold rounded-lg`}
          >
            {index + 1}
          </Button>
        ))}

        <Button variant="outline" onClick={handleNextPage} disabled={page === totalPages} size="icon">
          <ChevronRight />
        </Button>
      </div>

      {/* Create User Dialog */}
      <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
        <DialogContent>
          <DialogHeader>Create New User</DialogHeader>
          <AlertInfo />
          <div className="grid gap-4">
            <Label>Name</Label>
            <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" />
            <Label>Job</Label>
            <Input value={job} onChange={(e) => setJob(e.target.value)} placeholder="Job" />
          </div>
          <DialogFooter>
            <Button onClick={() => {
              handleCreateUser()
              toast({
                title: "User Created",
                description: `User ${name} has been created.`,
              })
            }}>Create</Button>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Update (PUT) User Dialog */}
      <Dialog open={showUpdateDialog} onOpenChange={setShowUpdateDialog}>
        <DialogContent>
          <DialogHeader>Update (PUT) User</DialogHeader>
          <AlertInfo />
          <div className="grid gap-4">
            <Label>Name</Label>
            <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" />
            <Label>Job</Label>
            <Input value={job} onChange={(e) => setJob(e.target.value)} placeholder="Job" />
          </div>
          <DialogFooter>
            <Button onClick={() => {
              handleUpdateUser()
              toast({
                title: "User Updated (PUT)",
                description: `User ${name} has been updated.`,
              })
            }}>Update (PUT)</Button>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Update (PATCH) User Dialog */}
      <Dialog open={showPatchDialog} onOpenChange={setShowPatchDialog}>
        <DialogContent>
          <DialogHeader>Update (PATCH) User</DialogHeader>
          <AlertInfo />
          <div className="grid gap-4">
            <Label>Name</Label>
            <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" />
            <Label>Job</Label>
            <Input value={job} onChange={(e) => setJob(e.target.value)} placeholder="Job" />
          </div>
          <DialogFooter>
            <Button onClick={() => {
              handlePatchUser()
              toast({
                title: "User Updated (PATCH)",
                description: `User ${name} has been updated.`,
              })
            }}>Update (PATCH)</Button>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default UsersPage;
