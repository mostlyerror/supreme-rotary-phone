import { prisma } from "@/lib/prisma"

export default async function ResponseList() {
  const responses = await prisma.response.findMany({
    orderBy: { createdAt: "desc" },
    take: 10,
  })

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Recent Responses</h2>
      <ul>
        {responses.map((response) => (
          <li key={response.id} className="mb-2">
            {response.emotion} - {response.createdAt.toLocaleString()}
          </li>
        ))}
      </ul>
    </div>
  )
}

