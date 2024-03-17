import monthsStatsData from '@/data.json'
import weekStatsData from '@/week.json'
import { BarChart, Bar, PieChart, Pie, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts'

const ChartWrap = ({ children }: { children : React.ReactNode }) => {
  return (
    <div className="w-[300px] md:w-[400px] lg:w-[450px] xl:w-[600px] h-[250px] lg:h-[400px] border-purple bg-slate-800/40 rounded-lg opacity-0.3 flex flex-col items-center justify-center text-light_text font-semibold">
      { children }
    </div>
  )
};

const MonthsChart = () => {
  const data = monthsStatsData;
  return (
    <ResponsiveContainer>
      <BarChart width={600} height={400} data={data} >
        <XAxis dataKey='month' stroke='#fff'/>
        <YAxis stroke='#fff' />
        <CartesianGrid stroke="#ccc" strokeDasharray="5 5"/>
        <Bar dataKey='wordCount' stroke='#F185B8' />
      </BarChart>
    </ResponsiveContainer>
  )
};
const WeekChart = () => {
  const data = weekStatsData;
  return (
    <ResponsiveContainer>
      <PieChart width={700} height={300} >
        <Pie data={data} dataKey='wordCount' nameKey='day' cx="50%" cy="50%" fill='#88CBFB' innerRadius={40} outerRadius={70} label/>
      </PieChart>
    </ResponsiveContainer>
  )
};

const Stats = () => {

  

  // show words learned by month, for 12 months
  // word count
  // show word learned today
  // how quickly revisted words are learned??

  return (
    <div>
      <h1>Stats Dashboard</h1>
      <div className="mt-4 gap-8 grid p-2 md:p-12 md:grid-cols-2 bg-slate-900">
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