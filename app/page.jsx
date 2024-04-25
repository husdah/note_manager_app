// home page
import { Suspense } from "react";
import NoteList from "./NoteList";
import Loading from "./loading";

export default function Home() {

  return (
    <main>
        <nav>
          <div>
            <h2>Notes</h2>
            <p><small>Currrent notes.</small></p>
          </div>
        </nav>
        
      <Suspense fallback={<Loading />}>
        <NoteList/>
      </Suspense>
    </main>
  );
}
