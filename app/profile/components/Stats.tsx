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
import { NextPage } from 'next'


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

const GeneralStats = (words: any) => {
  return (
    <div className='p-2 flex flex-wrap justify-center items-center gap-4'>
      <StatsWrap>
        {JSON.stringify(words.words)}
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
      {JSON.stringify(words.days)}
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
  const [ statsData, setStatsData ] = useState({word_count: 0, words:[{name: '', id: '', date: ''}]});
  const [ daysLearning, setDaysLearning ] = useState<any>(0);
  const [ firstWordDate, setFirstWordDate ] = useState<Date | undefined>();
  let days = 0;
  // get details from session storage
  const url = 'https://vocup.wigit.com.ng/getwords';

  // ------------------------------------------------------------------------------------------------------------------------------------------------
  // for local dev, uncomment the following line, and comment the one above
  // const url = 'http://127.0.0.1:8080/getwords';
  const [ selected, setSelected ] = useState<string | null>(null);

  const handleSelected  = (name:string) => {
    name === selected ? setSelected(null) : setSelected(name)
  };

  interface ItemProps {
    name: string
  }

  const SingleAccordion:NextPage<ItemProps> = ({ name }) => {
    return (
        <div onClick={() => {handleSelected(name)}} className='bg-pink text-grey mb-6'>
        <div className='flex justify-between bg-blue p-6 text-xl'><p className='pr-8'>{name}</p><p>+</p></div>
        {selected === name && <p>{name}&apos;s meaning coming soon </p> }
        </div>
    )
  };


  useEffect(() => {
    //get saved words
    const getStats = async () => {
      try {
        const { data, status } = await axios.post(url, user )
        console.log(user)
        if (status === 200) {
          // success
          setStatsData(data)
          setDaysLearning(Math.floor(((+new Date()) - (+new Date(data.words[0].date))) / (60 * 60 * 24 * 1000)))
        }
      } catch (error) {
        console.error(error)
      }
    }
   getStats()
  }, [user])

  // setDaysLearning(days)
  // show words learned by month, for 12 months
  // word count
  // show word learned today
  // how quickly revisted words are learned?

  return (
    <div className='text-light_text p-2 bg-slate-900 min-h-[100vh] min-w-[100vw]'>
      <div className='p-4'>
        <div className='font-bold text-[1.2rem] capitalize p-2 text-center'> Words to be revisted:</div>
        <div>{statsData && 
        statsData.words.map(item => (
          <div key={item.id}>
              { <SingleAccordion  name={item.name} /> }
          </div>
          ) )}
        </div>
      </div>
      <h1 className='font-bold text-[1.2rem] capitalize p-2 text-center'>Stats Dashboard</h1>
      <GeneralStats words={statsData.word_count} days={daysLearning}/>
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

