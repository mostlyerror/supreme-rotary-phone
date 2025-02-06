import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export default async function ResponseList() {
  const { data: responses } = await supabase
    .from('responses')
    .select()
    .order('created_at', { ascending: false })
    .limit(10)

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Recent Responses</h2>
      <ul>
        {responses?.map((response) => (
          <li key={response.id} className="mb-2">
            {response.emotion} - {new Date(response.created_at).toLocaleString()}
          </li>
        ))}
      </ul>
    </div>
  )
}

