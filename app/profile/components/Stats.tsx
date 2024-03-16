
const ChartWrap = ({ children }: { children : React.ReactNode }) => {
  return (
    <div className="w-[250px] lg:w[400px] h-[250px] lg:h-[400px] border-purple bg-slate-800/70 rounded-lg opacity-0.3 flex flex-col items-center justify-center text-light_text font-semibold">
      { children }
    </div>
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
      <div className="gap-8 grid p-8 lg:12 lg:grid-cols-3 bg-slate-900">
        <ChartWrap>
          <h2>Chart title</h2>
        </ChartWrap>
        <ChartWrap>
          <h2>Chart title</h2>
        </ChartWrap>
        <ChartWrap>
          <h2>Chart title</h2>
        </ChartWrap>
      </div>
    </div>
  )
};

export default Stats

// className="bg-purple opacity-40 min-h-screen"