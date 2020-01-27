import {css, jsx} from '@emotion/core'
import React from 'react'
import { Link } from 'react-router-dom'

const style = css`
    width: 100vw;
`

interface TopMenuProps {

}

export const TopMenu = (props: TopMenuProps) => {

    return (
        <div >
            <nav css={style}>
                <ul>
                    <li>
                        <Link to="/">Home</Link>
                    </li>
                    <li>
                        <Link to="/admin">Admin</Link>
                    </li>
                    <li>
                        <Link to="/detail">Detail</Link>
                    </li>
                </ul>
            </nav>
        </div>
    )
}