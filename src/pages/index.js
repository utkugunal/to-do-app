import { Inter } from "next/font/google";
import Navigation from "../components/Navigation/Navigation.js";
import SearchBar from "@/components/SearchBar/SearchBar.js";
import Tags from "@/components/Tags/Tags.js";
import NewButton from "@/components/NewButton/NewButton.js";
const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
      <SearchBar />
      <Navigation />
      <Tags />
      <NewButton />
    </>
  );
}
