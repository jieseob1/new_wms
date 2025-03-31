"use client"

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts"

const data = [
  {
    name: "1월",
    필름: 220,
    타일: 340,
    몰딩: 180,
    접착제: 290,
  },
  {
    name: "2월",
    필름: 280,
    타일: 300,
    몰딩: 200,
    접착제: 310,
  },
  {
    name: "3월",
    필름: 250,
    타일: 290,
    몰딩: 220,
    접착제: 300,
  },
  {
    name: "4월",
    필름: 310,
    타일: 380,
    몰딩: 260,
    접착제: 320,
  },
  {
    name: "5월",
    필름: 290,
    타일: 400,
    몰딩: 210,
    접착제: 280,
  },
  {
    name: "6월",
    필름: 350,
    타일: 420,
    몰딩: 270,
    접착제: 340,
  },
]

export function Overview() {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart data={data}>
        <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
        <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `${value}`} />
        <Tooltip />
        <Bar dataKey="필름" fill="#adfa1d" radius={[4, 4, 0, 0]} />
        <Bar dataKey="타일" fill="#2563eb" radius={[4, 4, 0, 0]} />
        <Bar dataKey="몰딩" fill="#f97316" radius={[4, 4, 0, 0]} />
        <Bar dataKey="접착제" fill="#8b5cf6" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  )
}

