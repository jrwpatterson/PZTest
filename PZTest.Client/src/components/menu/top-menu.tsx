import {css} from '@emotion/core'
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
            <nav>
                <ul>
                    <li>
                        <Link to="/">Home</Link>
                    </li>
                    <li>
                        <Link to="/about">About</Link>
                    </li>
                    <li>
                        <Link to="/users">Users</Link>
                    </li>
                </ul>
            </nav>
        </div>
    )
}