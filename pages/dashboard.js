import Head from 'next/head';
import { useEffect, useMemo, useState } from 'react';
import axios from 'axios';
import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/router';
import { LayoutDashboard, CalendarDays, Users, Settings, HelpCircle, Search, Bell, ChevronDown, BriefcaseBusiness, ArrowLeftRight, ListTodo, UserRound, ThumbsUp, MoreHorizontal, Menu, X, LogOut } from 'lucide-react';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, PieChart, Pie, Cell } from 'recharts';

const activityData = [
  { week: 'Week 1', guest: 180, user: 120 }, { week: 'Week 2', guest: 290, user: 250 },
  { week: 'Week 3', guest: 230, user: 190 }, { week: 'Week 4', guest: 360, user: 300 },
];
const productData = [{ name: 'Basic Tees', value: 55, color: '#91d69a' }, { name: 'Custom Short Pants', value: 31, color: '#f6d66e' }, { name: 'Super Hoodies', value: 14, color: '#ee8d8d' }];

export default function Dashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);
  const [demoUser, setDemoUser] = useState('');

  useEffect(() => { setDemoUser(localStorage.getItem('board-demo-user') || ''); }, []);
  useEffect(() => {
    let active = true;
    axios.get('https://jsonplaceholder.typicode.com/users')
      .then(res => { if (active) setUsers(res.data); })
      .catch(() => { if (active) setUsers([{id:1,name:'Alex Morgan',company:{name:'Meeting with suppliers'}},{id:2,name:'Sam Taylor',company:{name:'Product review'}}]); })
      .finally(() => { if (active) setLoading(false); });
    return () => { active = false; };
  }, []);

  const greetingName = session?.user?.name?.split(' ')[0] || demoUser.split('@')[0] || 'Mounika';
  const schedule = useMemo(() => [
    { time: '10:00 AM', title: 'Meeting with suppliers from Kuta Bali', detail: 'at Central Jakarta', color: '#80cf70' },
    { time: '12:30 PM', title: 'Check operation at Giga Factory 1', detail: 'at Central Jakarta', color: '#f0b94d' },
    { time: '03:00 PM', title: 'Product design review', detail: 'Online meeting', color: '#8b9cf0' },
  ], []);

  function logout() {
    if (session) signOut({ callbackUrl: '/' });
    else { localStorage.removeItem('board-demo-user'); router.push('/'); }
  }

  if (status === 'loading') return <div className="loading-screen">Loading your dashboard...</div>;
  return <>
    <Head><title>Dashboard | Board</title><meta name="description" content="Board analytics dashboard" /></Head>
    <div className="dashboard-shell">
      <aside className={`sidebar ${menuOpen ? 'sidebar-open' : ''}`}>
        <div className="sidebar-brand">Board.<button className="close-menu" onClick={() => setMenuOpen(false)}><X size={19}/></button></div>
        <nav className="side-nav">
          <a className="nav-item active" href="#dashboard"><LayoutDashboard size={17}/>Dashboard</a>
          <a className="nav-item" href="#transactions"><ArrowLeftRight size={17}/>Transactions</a>
          <a className="nav-item" href="#schedules"><CalendarDays size={17}/>Schedules</a>
          <a className="nav-item" href="#users"><Users size={17}/>Users</a>
          <a className="nav-item" href="#settings"><Settings size={17}/>Settings</a>
        </nav>
        <div className="sidebar-bottom"><a href="#help"><HelpCircle size={16}/>Help</a><a href="#contact">Contact Us</a><button onClick={logout}><LogOut size={15}/>Sign out</button></div>
      </aside>
      {menuOpen && <button className="mobile-overlay" onClick={() => setMenuOpen(false)} aria-label="Close menu"/>}
      <main className="main-content">
        <header className="topbar"><button className="menu-toggle" onClick={() => setMenuOpen(true)}><Menu size={21}/></button><div className="mobile-brand">Board.</div><div className="topbar-spacer"/><div className="search-box"><Search size={15}/><input placeholder="Search..." value={search} onChange={e => setSearch(e.target.value)}/></div><button className="icon-button" aria-label="Notifications"><Bell size={18}/><i/></button><div className="profile-mini"><div className="avatar">{greetingName.charAt(0).toUpperCase()}</div><span>{greetingName}</span><ChevronDown size={14}/></div></header>
        <div className="content-wrap">
          <div className="page-heading"><div><h1>Dashboard</h1><p>Welcome back, {greetingName}!</p></div><div className="date-chip">May - June 2024 <ChevronDown size={14}/></div></div>
          <section className="stats-grid">
            <article className="stat-card stat-green"><div className="stat-top"><span>Total Revenues</span><BriefcaseBusiness size={17}/></div><strong>$2,129,430</strong><span className="stat-change">↑ 2.5% <small>vs last month</small></span></article>
            <article className="stat-card stat-yellow"><div className="stat-top"><span>Total Transactions</span><ArrowLeftRight size={17}/></div><strong>1,520</strong><span className="stat-change">↑ 1.8% <small>vs last month</small></span></article>
            <article className="stat-card stat-pink"><div className="stat-top"><span>Total Likes</span><ThumbsUp size={17}/></div><strong>9,721</strong><span className="stat-change">↑ 3.2% <small>vs last month</small></span></article>
            <article className="stat-card stat-purple"><div className="stat-top"><span>Total Users</span><UserRound size={17}/></div><strong>{users.length ? '892' : '—'}</strong><span className="stat-change">↑ 1.2% <small>vs last month</small></span></article>
          </section>
          <section className="panel activity-panel"><div className="panel-heading"><div><h2>Activities</h2><p>May - June 2024 <ChevronDown size={12}/></p></div><div className="legend"><span><i className="legend-red"/>Guest</span><span><i className="legend-green"/>User</span></div></div><div className="activity-chart"><ResponsiveContainer width="100%" height="100%"><LineChart data={activityData} margin={{top:12,right:10,left:-18,bottom:0}}><CartesianGrid stroke="#edf0f2" vertical={false}/><XAxis dataKey="week" tick={{fontSize:10,fill:'#9299a3'}} axisLine={false} tickLine={false}/><YAxis tick={{fontSize:10,fill:'#9299a3'}} axisLine={false} tickLine={false} domain={[0,500]} ticks={[0,100,200,300,400,500]}/><Tooltip/><Line type="monotone" dataKey="guest" stroke="#ed7777" strokeWidth={1.8} dot={false} activeDot={{r:4}}/><Line type="monotone" dataKey="user" stroke="#75ce72" strokeWidth={1.8} dot={false} activeDot={{r:4}}/></LineChart></ResponsiveContainer></div></section>
          <section className="lower-grid">
            <article className="panel products-panel"><div className="panel-heading"><div><h2>Top products</h2><p>May - June 2024 <ChevronDown size={12}/></p></div><button className="more-button" aria-label="More options"><MoreHorizontal size={18}/></button></div><div className="products-content"><div className="pie-wrap"><ResponsiveContainer width="100%" height="100%"><PieChart><Pie data={productData} dataKey="value" nameKey="name" innerRadius={0} outerRadius="92%" paddingAngle={0}>{productData.map(item => <Cell key={item.name} fill={item.color}/>)}</Pie><Tooltip formatter={value => `${value}%`}/></PieChart></ResponsiveContainer></div><div className="product-legend">{productData.map(item => <div className="product-legend-item" key={item.name}><i style={{background:item.color}}/><div><b>{item.name}</b><small>{item.value}%</small></div></div>)}</div></div></article>
            <article className="panel schedule-panel" id="schedules"><div className="panel-heading"><div><h2>Today's schedule</h2><p>Thursday, 20 June 2024</p></div><button className="more-button" aria-label="More options"><MoreHorizontal size={18}/></button></div><div className="schedule-list">{schedule.slice(0, search ? 3 : 2).map((item, index) => <div className="schedule-item" key={item.title} style={{'--schedule-color':item.color}}><div className="schedule-title">{item.title}</div><p>{item.time} - {index === 0 ? '11:00 AM' : '01:30 PM'}</p><small>{item.detail}</small></div>)}</div></article>
          </section>
          <section className="api-section"><div><h2>Team directory</h2><p>Live sample data fetched from JSONPlaceholder API</p></div><span>{loading ? 'Loading...' : `${users.length} members`}</span></section>
          <div className="team-grid">{users.filter(user => user.name.toLowerCase().includes(search.toLowerCase())).slice(0,4).map(user => <div className="team-card" key={user.id}><div className="team-avatar">{user.name.charAt(0)}</div><div><b>{user.name}</b><small>{user.company?.name || 'Board team'}</small></div></div>)}</div>
          <footer className="footer-note">Board. <span>Analytics overview · Demo dashboard</span></footer>
        </div>
      </main>
    </div>
  </>;
}
