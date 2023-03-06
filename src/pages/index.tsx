import Homepage from '@/components/Homepage'
import Head from 'next/head'


export default function Home() {
  return (
    <div>
      <Head>
        <title>u-Mov</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Homepage />

    </div>
  )
}
