import React from 'react'
import lang from '../utils/languageConstant'
import { useSelector } from 'react-redux'

const GptSearchBar = () => {

    const langKey = useSelector(store => store.config.lang);


    return (
        <div className='pt-[10%] flex justify-center'>
            <form className=' w-1/2  bg-black grid grid-cols-12'>
                <input
                    type='text'
                    className='p-4 m-4 bg-white col-span-9'
                    placeholder={lang[langKey].gptSearchPlaceholder}>

                </input>
                <button className='m-4 py-2 px-4 bg bg-red-700 text-white rounded-lg col-span-3'>
                    {lang[langKey].search}
                </button>
            </form>
        </div>
    )
}

export default GptSearchBar