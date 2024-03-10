import { NextPage } from "next";
// interface for search result query
export interface SearchResultProps {
    data: any;
}

const searchResult: NextPage<SearchResultProps> = (word) => {
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

    return (
      <div className="max-w-[100vw]">
        {data && <div>name: {data.word}</div> }
        <br/>
        { data && <div className="max-w-full">phonetic: {data.phonetic}</div> }
        <br/>
        { data && <div className="result_field">audio: {data.phonetics[0].audio}</div> }
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
        {/* {word && JSON.stringify(word)} */}
      </div>
    )
};

export default searchResult