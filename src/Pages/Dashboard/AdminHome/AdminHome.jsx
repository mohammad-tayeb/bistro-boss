import { useQuery } from "@tanstack/react-query";
import UseAuth from "../../../Hooks/UseAuth";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { FaMoneyBill, FaProductHunt, FaStar, FaUser } from "react-icons/fa";
//for charts
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, PieChart, Pie, Legend } from 'recharts';

const colors = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', 'red', 'pink']; //barchart
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042']; //piechart

const AdminHome = () => {
    const axiosSecure = useAxiosSecure()
    const { data: stats = {} } = useQuery({
        queryKey: ['admin-stats'],
        queryFn: async () => {
            const res = await axiosSecure.get('/admin-stats')
            return res.data
        }
    })

    const { data: chartData = [] } = useQuery({
        queryKey: ['order-stats'],
        queryFn: async () => {
            const res = await axiosSecure.get('/order-stats');
            return res.data;
        }
    })

    console.log(chartData)
    console.log(stats)
    const { user } = UseAuth()

    //for chart 1
    const getPath = (x, y, width, height) => {
        return `M${x},${y + height}C${x + width / 3},${y + height} ${x + width / 2},${y + height / 3}
        ${x + width / 2}, ${y}
        C${x + width / 2},${y + height / 3} ${x + (2 * width) / 3},${y + height} ${x + width}, ${y + height}
        Z`;
    };

    const TriangleBar = (props) => {
        const { fill, x, y, width, height } = props;

        return <path d={getPath(x, y, width, height)} stroke="none" fill={fill} />;
    };

    // for chart2
    const RADIAN = Math.PI / 180;
    const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
        const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
        const x = cx + radius * Math.cos(-midAngle * RADIAN);
        const y = cy + radius * Math.sin(-midAngle * RADIAN);

        return (
            <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
                {`${(percent * 100).toFixed(0)}%`}
            </text>
        );
    };

    // manually added for pie chart
    const pieChartData = chartData.map(data => {
        return { name: data.category, value: data.revenue }
    })

    return (
        <>
            <div className="text-black font-semibold mx-40 mt-10">
                <h2 className="text-2xl">Hi! Welcome Back</h2>
                <h2 className="text-2xl text-yellow-500">{user?.displayName}</h2>
                <div className="stats shadow mt-5 w-full">
                    <div className="stat bg-purple-600 text-white">
                        <div className="flex flex-row items-center justify-between">
                            <div className="stat-value">${stats.revenue}</div>
                            <FaMoneyBill className="text-4xl mt-1"></FaMoneyBill>
                        </div>
                        <div className="stat-title text-white">Revenue</div>
                    </div>
                    <div className="stat bg-yellow-500">
                        <div className="flex flex-row items-center justify-between">
                            <div className="stat-value text-white">{stats.products}</div>
                            <FaProductHunt className="ms-2 text-4xl mt-1 text-white"></FaProductHunt>
                        </div>
                        <div className="stat-title text-white">Products</div>
                    </div>
                    <div className="stat bg-red-600">
                        <div className="flex flex-row items-center justify-between">
                            <div className="stat-value text-white">{stats.users}</div>
                            <FaUser className="ms-2 text-4xl mt-1 text-white"></FaUser>
                        </div>
                        <div className="stat-title text-white">Users</div>
                    </div>
                    <div className="stat bg-blue-600">
                        <div className="flex flex-row items-center justify-between">
                            <div className="stat-value text-white">{stats.reviews}</div>
                            <FaStar className="ms-2 text-4xl mt-1 text-white"></FaStar>
                        </div>
                        <div className="stat-title text-white">Reviews</div>
                    </div>
                </div>
            </div>
            <div className="flex items-center justify-center">
                <div>
                    <BarChart
                        width={500}
                        height={300}
                        data={chartData}
                        margin={{
                            top: 20,
                            right: 30,
                            left: 20,
                            bottom: 5,
                        }}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="category" />
                        <YAxis />
                        <Bar dataKey="quantity" fill="#8884d8" shape={<TriangleBar />} label={{ position: 'top' }}>
                            {chartData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={colors[index % 20]} />
                            ))}
                        </Bar>
                    </BarChart>
                </div>
                <div>
                    <PieChart width={400} height={400}>
                        <Pie
                            data={pieChartData}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            label={renderCustomizedLabel}
                            outerRadius={80}
                            fill="#8884d8"
                            dataKey="value"
                        >
                            {pieChartData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Pie>
                    <Legend></Legend>
                    </PieChart>
                </div>
            </div>
        </>
    );
};

export default AdminHome;
