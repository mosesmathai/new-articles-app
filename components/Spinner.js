import { PulseLoader } from "react-spinners"

export default function Spinner() {
  return (
    <div>
      <PulseLoader color={"white"} speedMultiplier={2}/>
    </div>
  )
}