"use client"
import { useState } from 'react'
import axios from 'axios'
// import useSound from 'use-sound';
import Input from '@/components/Input';
import Button, { ButtonProps } from '@/components/Button'
import SearchResult from '@/components/SearchResult'

 const BoopButton = () => {
  // const [play] = useSound("https://api.dictionaryapi.dev/media/pronunciations/en/travel-au.mp3");

  // return <button onClick={play}>Sound!</button>;
  return <button>Play Sound!</button>;
};

const WordLookUp = () => {
  const [ wordSearchString, setWordSearchString ] = useState<string>('');
  const [ searchResult, setSearchResult ] = useState<string>('');
  const [ error, setError ] = useState<any>('');
  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setWordSearchString(event.target.value) 
  }

  const HandleSearch = async (event:React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
    try {
      const { data, status } = await axios.get(`https://api.dictionaryapi.dev/api/v2/entries/en/${wordSearchString}`);
      if (status === 200 ) {
        setSearchResult(data)
      }
    } catch (error) {
      setError(error)
    }
  setWordSearchString('')
  };

  const inputFields = {
    name: 'searchString',
    type: 'text',
    id: 'wordSearchString',
    onChange: handleInput,
    className: 'p-2 min-w-[40%] text-center border border-grey'
  }
  const buttonFields: ButtonProps = {
    type: 'submit',
    text: 'Search',
    onClick: HandleSearch
  }

  return (
    <div className='bg-blue text-dark_text p-6 min-h-[15vh]'>
      <form className='bg-purple p-6 text-center'>
        <Input { ...inputFields} />
        <button onClick={HandleSearch} type='submit' disabled={false}
          className='py-2 px-4 text-md border border-grey bg-grey hover:bg-blue text-light_text hover:text-dark_text transition-all'>Look Up!</button>        
        <p>{wordSearchString}</p>
      </form>
      <SearchResult data={searchResult} />
    </div>
  )
};


export default WordLookUp
