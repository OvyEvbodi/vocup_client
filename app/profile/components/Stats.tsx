import { useEffect, useState } from 'react'
import { UserState } from '@/contexts/UserContext'
import axios from 'axios'
import monthsStatsData from '@/data.json'
import weekStatsData from '@/week.json'
import Image from 'next/image'
import calendar from '@/public/assets/calendar.svg'
import learn from '@/public/assets/learn.svg'
import statspic from '@/public/assets/stats.svg'
import { BarChart, Bar, PieChart, Pie, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts'

const StatsNav = () => {
  return (
    <nav className='p-6 bg-slate-600 flex gap-6'>
      <p>Navbar</p>
    </nav>
  )
};

const ChartWrap = ({ children }: { children : React.ReactNode }) => {
  return (
    <div className="p-2 w-[320px] md:w-[400px] lg:w-[450px] xl:w-[550px] h-[250px] lg:h-[400px] border-purple bg-slate-800/70 rounded-lg opacity-0.3 flex flex-col items-center justify-center text-light_text font-semibold">
      { children }
    </div>
  )
};

const StatsWrap = ({ children }: { children : React.ReactNode }) => {
  return (
    <div className="p-2 w-[170px] md:w-[200px] lg:w-[240px] xl:w-[300px] h-[150px] lg:h-[220px] border-purple bg-slate-800/70 rounded-lg opacity-0.3 flex flex-col items-center justify-center text-light_text font-semibold">
      { children }
    </div>
  )
};

const GeneralStats = () => {
  return (
    <div className='p-2 flex flex-wrap justify-center items-center gap-4'>
      <StatsWrap>
        {686}
        <h2>Words learned</h2>
        <div className="mt-2">
          <Image
            src={learn}
            alt="learn svg"
            width={70}
            height={100}
          />
        </div>
      </StatsWrap>
      <StatsWrap>
        {365}
        <h2>Days learning</h2>
        <div className="overflow- mt-2">
          <Image
            src={calendar}
            alt="calendar svg"
            width={80}
            height={100}
          />
          </div>
      </StatsWrap>
      <StatsWrap>
        {365}
        <h2>something here</h2>
        <div className="mt-2">
          <Image
            src={statspic}
            alt="stats svg"
            width={50}
            height={100}
          />
        </div>
      </StatsWrap>
    </div>
  )
};

const MonthsChart = () => {
  const data = monthsStatsData;
  return (
    <ResponsiveContainer width={'100%'} height={'100%'}>
      <BarChart width={600} height={400} data={data} >
        <XAxis dataKey='month' stroke='#fff'/>
        <YAxis stroke='#fff' />
        <CartesianGrid stroke="#ccc" strokeDasharray="5 5"/>
        <Bar dataKey='wordCount' fill='#F185B8' stroke='#9292F6' />
      </BarChart>
    </ResponsiveContainer>
  )
};
const WeekChart = () => {
  const data = weekStatsData;
  return (
    <ResponsiveContainer width={'100%'} height={'100%'}>
      <PieChart width={700} height={300} >
        <Pie data={data} dataKey='wordCount' nameKey='day' cx="50%" cy="50%" fill='#88CBFB' innerRadius={40} outerRadius={70} label/>
      </PieChart>
    </ResponsiveContainer>
  )
};

const Stats = (user: UserState) => {
  const headers = {
    "Content-Type": "Application/json",
    "Origin": "https://vocup.vercel.app"
  };
  const [ statsData, setStatsData ] = useState({});
  // get details from session storage
  const url = 'https://vocup.wigit.com.ng/getwords';
  // const headers = {};
  useEffect(() => {
    //get saved words
    //const { data, status } = await axios.post(url, user, { headers: headers })
    const getStats = async () => {
      try {
        const { data, status } = await axios.post(url, user, { headers: headers } )
        console.log(user)
        if (status === 200) {
          // success
          setStatsData(data)
        }
      } catch (error) {
        console.error(error)
        setStatsData({err: "no words found"})

      }
    }

    getStats()

  }, [])


  // show words learned by month, for 12 months
  // word count
  // show word learned today
  // how quickly revisted words are learned??

  return (
    <div className='text-light_text bg-slate-900 min-h-[100vh] min-w-[100vw]'>
      <div>{statsData && JSON.stringify(statsData)}</div>
      {/* <StatsNav /> */}
      <h1>Stats Dashboard</h1>
      <GeneralStats />
      <div className="flex flex-wrap justify-center items-center mt-4 gap-8 p-2 md:p-12 ">
        <ChartWrap>
          <h2>Monthly stats</h2>
          <MonthsChart />
        </ChartWrap>
        <ChartWrap>
          <h2>Weekly stats</h2>
          <WeekChart />
        </ChartWrap>
        
      </div>
    </div>
  )
};

export default Stats

// className="bg-purple opacity-40 min-h-screen"