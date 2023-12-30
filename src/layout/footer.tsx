import githubLogo from "@/assets/github.svg";
import { APP_GITHUB_LINK } from "@/constants";

export default function Footer() {
  return (
    <footer className="fixed flex justify-center items-center bottom-0 left-0 w-full h-10 bg-secondary">
         <div className="flex items-center">
            <a href={APP_GITHUB_LINK} target="_blank">
             <img src={githubLogo} className="h-6 w-6"  alt="github logo"/>
            </a>
         </div>
    </footer>
  )
}
