import React from 'react'
import { AiFillBook, AiFillStar, AiOutlineArrowRight, AiOutlineSearch } from "react-icons/ai";
import { MdCompare } from "react-icons/md";
import Hero from '../components/Hero';
import Navbar from '../components/Navbar';


export default function Homepage() {
    return (
        <div>
            <div className='h-[1500px] px-20 py-4 text-white bg-gradient-to-b from-[#000000] via-darkgray to-darkgray ' >
                {/* Nav */}
                <Navbar />
                {/* Main  */}
                <main className='px-20 py-44 flex-col flex gap-20'>
                    {/* hero */}
                    <Hero />
                </main>
                {/* hook */}
                <div className='flex justify-between flex-col items-center gap-10 h-[350px]'>
                    <h2 className='text-6xl font-lilita'>All the advantages</h2>
                    {/* bullet hooks */}
                    <ul className='flex justify-between w-full'>
                        <li className='bg-darkgray w-96 h-60 p-4 '>
                            <div className='flex gap-2 items-center text-3xl'>
                                <MdCompare />
                                <h3 className='text-2xl font-bold'>Compare</h3>
                            </div>
                            <p>Compare everything side by side and make the decision that suits you the best
                            </p>
                        </li>
                        <li className='bg-darkgray w-96 h-60 p-4 '>
                            <div className='flex gap-2 items-center text-3xl'>
                                <AiOutlineSearch />
                                <h3 className='text-2xl font-bold'>Search</h3></div>
                            <p>You dont know the location? use our extension
                            </p>
                        </li>
                        <li className='bg-darkgray w-96 h-60 p-4 '>
                            <div className='flex gap-2 items-center text-3xl'>
                                <AiFillBook />
                                <h3 className='text-2xl font-bold'>Research</h3></div>
                            <p>Research every fact before you move
                            </p>
                        </li>
                    </ul>
                </div>

            </div>
            {/*  */}
            <div className='h-[800px] bg-darkgray'>

            </div>
            <div className='bg-darkgray h-[800px]'>

            </div>


        </div>

    )
}
