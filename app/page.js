import Homepage from "@/app/Homepage";
import Matches from "@/app/components/Matches";
import Cards from "@/app/components/Cards";

export default function Home() {
    return (
      <div>
          <Homepage>
              <Matches />
          </Homepage>
      </div>
  )
}