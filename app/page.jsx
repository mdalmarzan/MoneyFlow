"use client";

import { useMemo, useState } from "react";
import {
  LayoutDashboard, ArrowLeftRight, WalletCards, Target, BarChart3,
  Settings, Bell, Search, Plus, TrendingUp, TrendingDown, Wallet,
  CircleDollarSign, MoreHorizontal, ChevronDown, Menu, X, CheckCircle2
} from "lucide-react";
import {
  AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell
} from "recharts";
import "./styles.css";

const spending = [
  { day: "Mon", value: 420 }, { day: "Tue", value: 680 },
  { day: "Wed", value: 510 }, { day: "Thu", value: 920 },
  { day: "Fri", value: 760 }, { day: "Sat", value: 1180 },
  { day: "Sun", value: 840 }
];

const categories = [
  { name: "Food & Dining", value: 32, amount: 912, icon: "🍔" },
  { name: "Bills & Utilities", value: 24, amount: 684, icon: "💡" },
  { name: "Transport", value: 18, amount: 513, icon: "🚕" },
  { name: "Shopping", value: 14, amount: 399, icon: "🛍️" },
  { name: "Other", value: 12, amount: 342, icon: "📦" }
];

const transactions = [
  ["🍔", "Lunch at Chillox", "Food & Dining", "-৳450", "Today, 1:20 PM"],
  ["💳", "Monthly subscription", "Bills & Utilities", "-৳899", "Today, 9:15 AM"],
  ["💰", "Freelance payment", "Income", "+৳18,500", "Yesterday"],
  ["🚕", "Uber ride", "Transport", "-৳320", "Yesterday"],
  ["🛍️", "New headphones", "Shopping", "-৳4,200", "Sep 16"]
];

const initialGoals = [
  { name: "New MacBook", current: 82000, target: 150000, icon: "💻" },
  { name: "Emergency Fund", current: 52000, target: 100000, icon: "🛟" },
  { name: "Travel Fund", current: 27500, target: 60000, icon: "✈️" }
];

function money(n) {
  return "৳" + n.toLocaleString("en-BD");
}

export default function Home() {
  const [active, setActive] = useState("Dashboard");
  const [mobile, setMobile] = useState(false);
  const [modal, setModal] = useState(false);
  const [toast, setToast] = useState("");
  const [goals, setGoals] = useState(initialGoals);

  const totalSaved = useMemo(() => goals.reduce((a, g) => a + g.current, 0), [goals]);

  const showToast = (message) => {
    setToast(message);
    setTimeout(() => setToast(""), 2200);
  };

  const addTransaction = () => {
    setModal(false);
    showToast("Transaction added successfully");
  };

  return (
    <main className="app">
      <aside className={mobile ? "sidebar open" : "sidebar"}>
        <div className="brand">
          <div className="brandMark"><CircleDollarSign size={23}/></div>
          <span>Money<span>Flow</span></span>
          <button className="mobileClose" onClick={() => setMobile(false)}><X/></button>
        </div>

        <div className="workspace">
          <div className="avatar">AM</div>
          <div><strong>Al Marzan</strong><small>Personal workspace</small></div>
          <ChevronDown size={15}/>
        </div>

        <nav>
          {[
            ["Dashboard", LayoutDashboard], ["Transactions", ArrowLeftRight],
            ["Accounts", WalletCards], ["Budgets", Target], ["Analytics", BarChart3]
          ].map(([name, Icon]) => (
            <button key={name} className={active === name ? "navItem active" : "navItem"}
              onClick={() => { setActive(name); setMobile(false); }}>
              <Icon size={19}/><span>{name}</span>
            </button>
          ))}
        </nav>

        <div className="sidebarBottom">
          <button className="navItem" onClick={() => showToast("Settings panel coming next")}><Settings size={19}/>Settings</button>
          <div className="upgrade">
            <div className="upgradeIcon">✦</div>
            <strong>MoneyFlow Pro</strong>
            <p>Unlock deeper analytics and unlimited goals.</p>
            <button onClick={() => showToast("Pro upgrade selected")}>Explore Pro</button>
          </div>
        </div>
      </aside>

      {mobile && <div className="overlay" onClick={() => setMobile(false)}/>}

      <section className="content">
        <header className="topbar">
          <button className="menu" onClick={() => setMobile(true)}><Menu/></button>
          <div className="crumb"><span>Workspace</span><b>/</b><strong>{active}</strong></div>
          <div className="topActions">
            <div className="search"><Search size={17}/><input placeholder="Search transactions..." /></div>
            <button className="iconBtn"><Bell size={19}/><i/></button>
            <div className="topAvatar">AM</div>
          </div>
        </header>

        <div className="page">
          <div className="pageHead">
            <div>
              <p className="eyebrow">Saturday, September 19, 2026</p>
              <h1>Good evening, Al Marzan <span>👋</span></h1>
              <p className="sub">Here’s what’s happening with your money this month.</p>
            </div>
            <button className="primary" onClick={() => setModal(true)}><Plus size={18}/> Add transaction</button>
          </div>

          <section className="stats">
            <Stat title="Total balance" value="৳85,420" change="+8.2%" icon={<Wallet/>} positive/>
            <Stat title="Income this month" value="৳45,000" change="+12.5%" icon={<TrendingUp/>} positive/>
            <Stat title="Expenses this month" value="৳28,500" change="-4.8%" icon={<TrendingDown/>}/>
            <Stat title="Savings rate" value="36.7%" change="+5.4%" icon={<CircleDollarSign/>} positive/>
          </section>

          <div className="grid2">
            <section className="card chartCard">
              <div className="cardHead">
                <div><h2>Spending overview</h2><p>Your daily spending for this week</p></div>
                <button className="select">This week <ChevronDown size={15}/></button>
              </div>
              <div className="chart">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={spending}>
                    <defs><linearGradient id="fill" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopOpacity=".28"/><stop offset="100%" stopOpacity=".02"/></linearGradient></defs>
                    <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{fill:"#8c96a8",fontSize:12}}/>
                    <YAxis hide/>
                    <Tooltip contentStyle={{background:"#151a24",border:"1px solid #293141",borderRadius:12,color:"#fff"}} formatter={(v)=>[money(v),"Spent"]}/>
                    <Area type="monotone" dataKey="value" stroke="#7c5cff" strokeWidth={3} fill="url(#fill)"/>
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </section>

            <section className="card">
              <div className="cardHead"><div><h2>Spending by category</h2><p>Where your money went</p></div><button className="dots"><MoreHorizontal/></button></div>
              <div className="donutWrap">
                <ResponsiveContainer width="45%" height={190}>
                  <PieChart><Pie data={categories} dataKey="value" innerRadius={55} outerRadius={78} paddingAngle={3}>
                    {categories.map((_,i)=><Cell key={i} fill={["#7c5cff","#27c7a8","#f6b94c","#ef6a88","#718096"][i]}/>)}
                  </Pie></PieChart>
                </ResponsiveContainer>
                <div className="legend">{categories.map(c=><div className="legendRow" key={c.name}><span><i className="dot"/>{c.name}</span><strong>{c.value}%</strong></div>)}</div>
              </div>
            </section>
          </div>

          <div className="grid2 lower">
            <section className="card">
              <div className="cardHead"><div><h2>Recent transactions</h2><p>Your latest money activity</p></div><button className="textBtn" onClick={()=>setActive("Transactions")}>View all →</button></div>
              <div className="transactions">{transactions.map((t,i)=><div className="transaction" key={i}>
                <div className="txIcon">{t[0]}</div><div className="txMain"><strong>{t[1]}</strong><span>{t[2]} · {t[4]}</span></div><strong className={t[3][0]==="+"?"income":"expense"}>{t[3]}</strong>
              </div>)}</div>
            </section>

            <section className="card">
              <div className="cardHead"><div><h2>Savings goals</h2><p>Keep moving toward your goals</p></div><button className="textBtn" onClick={()=>showToast("Goal creator opened")}>+ New goal</button></div>
              <div className="goals">{goals.map(g=>{
                const pct=Math.round(g.current/g.target*100);
                return <div className="goal" key={g.name}><div className="goalTop"><span className="goalName"><b>{g.icon}</b>{g.name}</span><strong>{pct}%</strong></div><div className="progress"><span style={{width:`${pct}%`}}/></div><div className="goalBottom"><span>{money(g.current)} saved</span><span>of {money(g.target)}</span></div></div>
              })}</div>
              <div className="savedTotal"><span>Total saved across goals</span><strong>{money(totalSaved)}</strong></div>
            </section>
          </div>
        </div>
      </section>

      {modal && <div className="modalBackdrop" onClick={()=>setModal(false)}><div className="modal" onClick={e=>e.stopPropagation()}>
        <div className="modalHead"><div><h2>Add transaction</h2><p>Record income or an expense.</p></div><button onClick={()=>setModal(false)}><X/></button></div>
        <label>Type<select><option>Expense</option><option>Income</option></select></label>
        <label>Amount<input type="number" placeholder="0.00"/></label>
        <label>Category<select><option>Food & Dining</option><option>Bills & Utilities</option><option>Transport</option><option>Shopping</option><option>Other</option></select></label>
        <label>Description<input placeholder="What was this for?"/></label>
        <div className="modalActions"><button className="cancel" onClick={()=>setModal(false)}>Cancel</button><button className="primary" onClick={addTransaction}><CheckCircle2 size={17}/> Save transaction</button></div>
      </div></div>}

      {toast && <div className="toast"><CheckCircle2 size={18}/>{toast}</div>}
    </main>
  );
}

function Stat({title,value,change,icon,positive}) {
  return <div className="stat card"><div className="statTop"><span>{title}</span><div className="statIcon">{icon}</div></div><div className="statValue">{value}</div><div className={positive?"change positive":"change negative"}>{change} <span>vs last month</span></div></div>
}