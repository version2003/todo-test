'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useQuery } from "convex/react";
import { api } from "../../../../../convex/_generated/api";
import { useUser } from "@clerk/nextjs";
import moment from "moment";
import { Skeleton } from "@/components/ui/skeleton";
import SideBar from "@/components/Side-bar";

export default function ProgressGraph() {
  const { user } = useUser();
  const todos = useQuery(api.todo.getAllTodosOfUser, { userId: user?.id as string });

  if (!todos) {
    return (
      <div className="flex items-center justify-center min-h-screen p-4">
        <Card className="w-full max-w-2xl">
          <CardHeader>
            <CardTitle>Progress Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="h-[400px] w-full">
                <Skeleton className="h-full w-full" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  console.log(todos);

  // Transform todos data for the chart
  const data = Array.from({ length: 7 }, (_, i) => {
    const date = moment().subtract(6 - i, 'days');
    const dayTodos = todos.filter(todo => {
      const todoDate = moment(todo.dueDate);
      return todoDate.isSame(date, 'day');
    });
    
    return {
      name: date.format('ddd'),
      completed: dayTodos.filter(todo => todo.isCompleted).length,
      total: dayTodos.length
    };
  });

  return (
    <>
      <div className="flex items-center justify-center min-h-screen p-4">
        <Card className="w-full max-w-2xl">
          <CardHeader>
            <CardTitle>Progress Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="h-[400px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="completed" fill="#4f46e5" name="Completed" />
                    <Bar dataKey="total" fill="#94a3b8" name="Total" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
}

