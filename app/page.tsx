import SignUpForm from "./components/SignUpForm"
import ResponseList from "./components/ResponseList"

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Daily Emotion Tracker</h1>
      <SignUpForm />
      {/* <ResponseList /> */}
    </div>
  )
}

