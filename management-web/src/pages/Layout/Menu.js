import React from 'react'
import { withState, withHandlers, compose } from 'recompose'
import { merge, click } from 'src/util'
import { SpeackSvg, MeetingSvg, ContactSvg, SettingSvg } from 'src/iconSvg'
import history from 'src/util/history'

import s from './Menu.less'

const ms = [
    {
        name: '部门',
        icon: <SettingSvg />,
        children: [
            // { name: '产品部', url: '/staff?department=product' },
            // { name: '研发部', url: '/staff?department=develop' },
            // { name: '销售部', url: '/staff?department=sales' },
        ],
        url: '/staff',
    },
    { name: '社区', icon: <ContactSvg />, children: [], url: '/community' },
    {
        name: '设置',
        icon: <SettingSvg />,
        children: [{ name: '部门', url: '/' }, { name: '信息', url: '/' }, { name: '其他', url: '/' }],
    },
]

function render({ menus, menuClick, childMenuClick }) {
    return (
        <div className={s.root}>
            {menus.map(({ name, icon, children, showChild }, idx) => (
                <div className={s.perMenu} key={name} onClick={() => menuClick(idx)}>
                    <div className={s.menuTitle}>
                        <div>{icon}</div>
                        <div>{name}</div>
                    </div>
                    {showChild && (
                        <div className={s.menuChild}>
                            <div className={s.childLine} />
                            <div className={s.childContainer}>
                                {!!children.length &&
                                    children.map(child => (
                                        <div
                                            key={child.name}
                                            className={s.perChild}
                                            onClick={click(childMenuClick, child)}
                                        >
                                            <div>
                                                <div>{child.name}</div>
                                            </div>
                                        </div>
                                    ))}
                            </div>
                        </div>
                    )}
                </div>
            ))}
        </div>
    )
}

export default compose(
    withState('menus', 'setMenus', ms),
    withHandlers({
        menuClick: ({ setMenus, menus }) => idx => {
            const menu = menus[idx]
            const { url } = menu
            if (url) {
                return history.push(url)
            }
            const r = { ...menu, showChild: !menu.showChild }
            menus.splice(idx, 1, r)
            setMenus(menus)
        },
        childMenuClick: () => childMenu => {
            const { url } = childMenu
            history.push(url)
        },
    }),
)(render)
