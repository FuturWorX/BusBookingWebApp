"use client"

import { useState } from "react"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { PlusIcon, MoreHorizontalIcon, PencilIcon, TrashIcon, SearchIcon, CheckIcon, XIcon } from "lucide-react"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"

// Mock data for users
const initialUsers = [
  {
    id: 1,
    name: "John Doe",
    email: "john.doe@exxaro.com",
    phone: "+27 71 234 5678",
    role: "Admin",
    status: "Active",
    department: "IT",
    employeeId: "EX-12345",
    lastActive: "2 hours ago",
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane.smith@exxaro.com",
    phone: "+27 72 345 6789",
    role: "Driver",
    status: "Active",
    department: "Transport",
    employeeId: "EX-23456",
    lastActive: "1 day ago",
  },
  {
    id: 3,
    name: "Michael Johnson",
    email: "michael.johnson@exxaro.com",
    phone: "+27 73 456 7890",
    role: "Admin",
    status: "Inactive",
    department: "Management",
    employeeId: "EX-34567",
    lastActive: "5 days ago",
  },
  {
    id: 4,
    name: "Sarah Williams",
    email: "sarah.williams@exxaro.com",
    phone: "+27 74 567 8901",
    role: "Driver",
    status: "Active",
    department: "Transport",
    employeeId: "EX-45678",
    lastActive: "3 hours ago",
  },
  {
    id: 5,
    name: "Robert Brown",
    email: "robert.brown@exxaro.com",
    phone: "+27 75 678 9012",
    role: "Driver",
    status: "Active",
    department: "Transport",
    employeeId: "EX-56789",
    lastActive: "Just now",
  },
]

export default function UserManagement() {
  const [users, setUsers] = useState(initialUsers)
  const [searchQuery, setSearchQuery] = useState("")
  const [activeTab, setActiveTab] = useState("all")
  const [isAddUserDialogOpen, setIsAddUserDialogOpen] = useState(false)
  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    phone: "",
    role: "Driver",
    department: "",
    employeeId: "",
  })
  const [editingUser, setEditingUser] = useState<null | (typeof initialUsers)[0]>(null)

  // Filter users based on search query and active tab
  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.phone.includes(searchQuery) ||
      user.employeeId.toLowerCase().includes(searchQuery.toLowerCase())

    if (activeTab === "all") return matchesSearch
    if (activeTab === "admins") return matchesSearch && user.role === "Admin"
    if (activeTab === "drivers") return matchesSearch && user.role === "Driver"
    if (activeTab === "inactive") return matchesSearch && user.status === "Inactive"

    return matchesSearch
  })

  const handleAddUser = () => {
    const id = Math.max(...users.map((user) => user.id)) + 1
    const newUserWithDefaults = {
      ...newUser,
      id,
      status: "Active",
      lastActive: "Just now",
    }

    setUsers([...users, newUserWithDefaults])
    setNewUser({
      name: "",
      email: "",
      phone: "",
      role: "Driver",
      department: "",
      employeeId: "",
    })
    setIsAddUserDialogOpen(false)
  }

  const handleEditUser = () => {
    if (!editingUser) return

    setUsers(users.map((user) => (user.id === editingUser.id ? editingUser : user)))
    setEditingUser(null)
  }

  const handleDeleteUser = (id: number) => {
    setUsers(users.filter((user) => user.id !== id))
  }

  const handleToggleUserStatus = (id: number) => {
    setUsers(
      users.map((user) =>
        user.id === id ? { ...user, status: user.status === "Active" ? "Inactive" : "Active" } : user,
      ),
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-secondary font-exxaro">User Management</h1>
          <p className="text-slate-500 font-exxaro">Manage admins and drivers in the system</p>
        </div>
        <Dialog open={true}>
          <DialogTrigger asChild>
            <Button className="font-exxaro">
              <PlusIcon className="h-4 w-4 mr-2" />
              Add User
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle className="font-exxaro">Add New User</DialogTitle>
              <DialogDescription className="font-exxaro">Add a new admin or driver to the system</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="name" className="font-exxaro">
                  Full Name
                </Label>
                <Input
                  id="name"
                  value={newUser.name}
                  onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                  className="font-exxaro"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email" className="font-exxaro">
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={newUser.email}
                  onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                  className="font-exxaro"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="phone" className="font-exxaro">
                  Phone Number
                </Label>
                <Input
                  id="phone"
                  value={newUser.phone}
                  onChange={(e) => setNewUser({ ...newUser, phone: e.target.value })}
                  className="font-exxaro"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="role" className="font-exxaro">
                  Role
                </Label>
                <Select value={newUser.role} onValueChange={(value) => setNewUser({ ...newUser, role: value })}>
                  <SelectTrigger id="role" className="font-exxaro">
                    <SelectValue placeholder="Select role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Admin" className="font-exxaro">
                      Admin
                    </SelectItem>
                    <SelectItem value="Driver" className="font-exxaro">
                      Driver
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="department" className="font-exxaro">
                  Department
                </Label>
                <Input
                  id="department"
                  value={newUser.department}
                  onChange={(e) => setNewUser({ ...newUser, department: e.target.value })}
                  className="font-exxaro"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="employeeId" className="font-exxaro">
                  Employee ID
                </Label>
                <Input
                  id="employeeId"
                  value={newUser.employeeId}
                  onChange={(e) => setNewUser({ ...newUser, employeeId: e.target.value })}
                  className="font-exxaro"
                />
              </div>
            </div>
            <DialogFooter>
              <Button
                type="button" // Changed from "submit" to "button" to prevent form submission
                onClick={handleAddUser}
                disabled={!newUser.name || !newUser.email || !newUser.phone}
                className="font-exxaro"
              >
                Add User
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <CardTitle className="text-xl font-exxaro">Users</CardTitle>
            <div className="relative w-full md:w-64">
              <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
              <Input
                placeholder="Search users..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 font-exxaro"
              />
            </div>
          </div>
          <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid grid-cols-4 w-full max-w-md">
              <TabsTrigger value="all" className="font-exxaro">
                All
              </TabsTrigger>
              <TabsTrigger value="admins" className="font-exxaro">
                Admins
              </TabsTrigger>
              <TabsTrigger value="drivers" className="font-exxaro">
                Drivers
              </TabsTrigger>
              <TabsTrigger value="inactive" className="font-exxaro">
                Inactive
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 font-medium text-slate-500 font-exxaro">User</th>
                  <th className="text-left py-3 font-medium text-slate-500 font-exxaro">Role</th>
                  <th className="text-left py-3 font-medium text-slate-500 font-exxaro">Status</th>
                  <th className="text-left py-3 font-medium text-slate-500 font-exxaro">Employee ID</th>
                  <th className="text-left py-3 font-medium text-slate-500 font-exxaro">Last Active</th>
                  <th className="text-right py-3 font-medium text-slate-500 font-exxaro">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.length > 0 ? (
                  filteredUsers.map((user) => (
                    <tr key={user.id} className="border-b last:border-0 hover:bg-slate-50">
                      <td className="py-3">
                        <div className="flex items-center gap-3">
                          <Avatar>
                            <AvatarFallback className="bg-primary/20 text-primary font-exxaro">
                              {user.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium font-exxaro">{user.name}</p>
                            <p className="text-sm text-slate-500 font-exxaro">{user.email}</p>
                          </div>
                        </div>
                      </td>
                      <td className="py-3">
                        <Badge variant={user.role === "Admin" ? "default" : "secondary"} className="font-exxaro">
                          {user.role}
                        </Badge>
                      </td>
                      <td className="py-3">
                        <div className="flex items-center gap-2">
                          <div
                            className={`w-2 h-2 rounded-full ${user.status === "Active" ? "bg-green-500" : "bg-red-500"}`}
                          ></div>
                          <span className="font-exxaro">{user.status}</span>
                        </div>
                      </td>
                      <td className="py-3 font-exxaro">{user.employeeId}</td>
                      <td className="py-3 font-exxaro">{user.lastActive}</td>
                      <td className="py-3 text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreHorizontalIcon className="h-4 w-4" />
                              <span className="sr-only">Actions</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel className="font-exxaro">Actions</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <Dialog>
                              <DialogTrigger asChild>
                                <DropdownMenuItem
                                  onSelect={(e) => {
                                    e.preventDefault()
                                    setEditingUser(user)
                                  }}
                                  className="font-exxaro"
                                >
                                  <PencilIcon className="h-4 w-4 mr-2" />
                                  Edit
                                </DropdownMenuItem>
                              </DialogTrigger>
                              <DialogContent className="sm:max-w-[425px]">
                                {editingUser && (
                                  <>
                                    <DialogHeader>
                                      <DialogTitle className="font-exxaro">Edit User</DialogTitle>
                                      <DialogDescription className="font-exxaro">
                                        Make changes to the user details
                                      </DialogDescription>
                                    </DialogHeader>
                                    <div className="grid gap-4 py-4">
                                      <div className="grid gap-2">
                                        <Label htmlFor="edit-name" className="font-exxaro">
                                          Full Name
                                        </Label>
                                        <Input
                                          id="edit-name"
                                          value={editingUser.name}
                                          onChange={(e) => setEditingUser({ ...editingUser, name: e.target.value })}
                                          className="font-exxaro"
                                        />
                                      </div>
                                      <div className="grid gap-2">
                                        <Label htmlFor="edit-email" className="font-exxaro">
                                          Email
                                        </Label>
                                        <Input
                                          id="edit-email"
                                          type="email"
                                          value={editingUser.email}
                                          onChange={(e) => setEditingUser({ ...editingUser, email: e.target.value })}
                                          className="font-exxaro"
                                        />
                                      </div>
                                      <div className="grid gap-2">
                                        <Label htmlFor="edit-phone" className="font-exxaro">
                                          Phone Number
                                        </Label>
                                        <Input
                                          id="edit-phone"
                                          value={editingUser.phone}
                                          onChange={(e) => setEditingUser({ ...editingUser, phone: e.target.value })}
                                          className="font-exxaro"
                                        />
                                      </div>
                                      <div className="grid gap-2">
                                        <Label htmlFor="edit-role" className="font-exxaro">
                                          Role
                                        </Label>
                                        <Select
                                          value={editingUser.role}
                                          onValueChange={(value) => setEditingUser({ ...editingUser, role: value })}
                                        >
                                          <SelectTrigger id="edit-role" className="font-exxaro">
                                            <SelectValue placeholder="Select role" />
                                          </SelectTrigger>
                                          <SelectContent>
                                            <SelectItem value="Admin" className="font-exxaro">
                                              Admin
                                            </SelectItem>
                                            <SelectItem value="Driver" className="font-exxaro">
                                              Driver
                                            </SelectItem>
                                          </SelectContent>
                                        </Select>
                                      </div>
                                      <div className="grid gap-2">
                                        <Label htmlFor="edit-department" className="font-exxaro">
                                          Department
                                        </Label>
                                        <Input
                                          id="edit-department"
                                          value={editingUser.department}
                                          onChange={(e) =>
                                            setEditingUser({ ...editingUser, department: e.target.value })
                                          }
                                          className="font-exxaro"
                                        />
                                      </div>
                                      <div className="grid gap-2">
                                        <Label htmlFor="edit-employeeId" className="font-exxaro">
                                          Employee ID
                                        </Label>
                                        <Input
                                          id="edit-employeeId"
                                          value={editingUser.employeeId}
                                          onChange={(e) =>
                                            setEditingUser({ ...editingUser, employeeId: e.target.value })
                                          }
                                          className="font-exxaro"
                                        />
                                      </div>
                                    </div>
                                    <DialogFooter>
                                      <Button
                                        type="button"
                                        onClick={handleEditUser}
                                        disabled={!editingUser.name || !editingUser.email || !editingUser.phone}
                                        className="font-exxaro"
                                      >
                                        Save Changes
                                      </Button>
                                    </DialogFooter>
                                  </>
                                )}
                              </DialogContent>
                            </Dialog>
                            <DropdownMenuItem
                              onSelect={(e) => {
                                e.preventDefault()
                                handleToggleUserStatus(user.id)
                              }}
                              className="font-exxaro"
                            >
                              {user.status === "Active" ? (
                                <>
                                  <XIcon className="h-4 w-4 mr-2" />
                                  Deactivate
                                </>
                              ) : (
                                <>
                                  <CheckIcon className="h-4 w-4 mr-2" />
                                  Activate
                                </>
                              )}
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onSelect={(e) => {
                                e.preventDefault()
                                handleDeleteUser(user.id)
                              }}
                              className="text-red-600 focus:text-red-600 font-exxaro"
                            >
                              <TrashIcon className="h-4 w-4 mr-2" />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={6} className="py-6 text-center text-slate-500 font-exxaro">
                      No users found matching your search criteria
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between border-t pt-4">
          <p className="text-sm text-slate-500 font-exxaro">
            Showing {filteredUsers.length} of {users.length} users
          </p>
        </CardFooter>
      </Card>
    </div>
  )
}

