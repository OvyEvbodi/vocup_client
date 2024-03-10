import { NextPage } from "next";
// interface for search result query
export interface SearchResultProps {
    data: any;
}

const searchResult: NextPage<SearchResultProps> = (word) => {
    const data = word.data[0];
    return (
        <div className="max-w-[100vw]">
            {data && <div>name: {data.word}</div> }
            <br/>
            { data && <div>phonetic: {data.phonetic}</div> }
            <br/>
            { data && <div>audio: {data.phonetics[0].audio}</div> }
            <br/>
            { data && <div>{data.meanings.map((meaning:any, index:any) => <div><div>meaning({index +1}): {JSON.stringify(meaning)}</div><br /></div>)}</div>}
            <br/>
            <div>origin</div>
            {/* {word && JSON.stringify(word)} */}

        </div>
    )
};

export default searchResult