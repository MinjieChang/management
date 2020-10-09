import loadable from '@loadable/component'

// import Home from 'bundle-loader?lazy&name=home!pages/Home/Home'
// import Page1 from 'bundle-loader?lazy&name=page1!pages/Page1/Page1'
// import Counter from 'bundle-loader?lazy&name=page1!pages/Counter/Counter'
// import UserInfo from 'bundle-loader?lazy&name=page1!pages/UserInfo/UserInfo'

// TODO 此文件夹暂时未用到

const Home = loadable(() => import('../pages/Home/Home'))
const Page1 = loadable(() => import('../pages/Page1/Page1'))
const Counter = loadable(() => import('../pages/Counter/Counter'))
const UserInfo = loadable(() => import('../pages/UserInfo/UserInfo'))

export default {
	Home,
	Page1,
	Counter,
	UserInfo
}
