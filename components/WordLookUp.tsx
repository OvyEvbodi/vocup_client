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
    onChange: handleInput
  }
  const buttonFields: ButtonProps = {
    type: 'submit',
    text: 'Search',
    onClick: HandleSearch
  }

  return (
    <div className='bg-gray-300 text-dark_text p-6 min-h-[100vh]'>
      <form className='bg-gray-200 p-6'>
        <Input { ...inputFields} />
        <Button { ...buttonFields } />
        <p>{wordSearchString}</p>
      </form>
      <SearchResult data={searchResult} />
    </div>
  )
};


export default WordLookUp
