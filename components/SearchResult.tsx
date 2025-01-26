import { NextPage } from "next";
import UseSignInContext from '@/contexts/SignInContext'
import axios from 'axios'

// interface for search result query
export interface SearchResultProps {
    data: any;
}

const searchResult: NextPage<SearchResultProps> = (word) => {

  const { isSignedIn } = UseSignInContext();
  const data = word.data[0];
  const FormatMeanings = (meaning:any) => {
    meaning.definitions.map((item:any) => (item) )
    return (
      <div>
        <div>Part of speech: {meaning.partOfSpeech}</div>
        <div>Definition: {JSON.stringify(meaning.definitions)}</div>
      </div>
    )
    };

    const handleSaveWord = async(newWord: string) => {
      console.log(newWord)
      // const url = 'https://vocup.wigit.com.ng/saveword';

      // ------------------------------------------------------------------------------------------------------------------------------------------------
      // for local dev, uncomment the following line, and comment the one above
      const url = 'http://127.0.0.1:8080/saveword';
      const wordData = {}
      try {
        axios.post(url, wordData, )
      } catch (error) {
        console.log(error)
      }
    };

    const handlePlaySound = async () => {
      const soundUrl = data && data.phonetics.length > 0 && data.phonetics.length > 1 && data.phonetics[1].audio != "" ? data.phonetics[1].audio : data.phonetics[0].audio;
      const audioSound = new Audio(soundUrl);
      audioSound.play()
    };

  return (
    <div className="max-w-[100vw]">
      {data && <div>name: {data.word}  {data && isSignedIn && <button onClick={() => handleSaveWord(data.word)} className="bg-pink py-1 px-2 rounded m-2">save word</button>}</div> }
      <br/>
      { data && <div className="max-w-full">phonetic: {data.phonetic}</div> }
      <br/>
     { data && data.phonetics.length > 0 && <div> audio: <button onClick={()=> handlePlaySound()} className="bg-pink p-4 rounded-md">click to pronounce</button>
      </div> }
      <br/>
      { data && 
        <div>{data.meanings.map((meaning:any, index:any) => 
          <div key={index}>
            <div>
              meaning({index +1}): <br />
              Part of speech: {meaning.partOfSpeech} <br />
              Definition: {meaning.definitions[0].definition} <br />
              Example: {meaning.definitions[0].example} 
            </div>
            <br />
          </div>
      )}</div> }
      <br/>
    </div>
  )
};

export default searchResult