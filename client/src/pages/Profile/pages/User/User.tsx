import React, { useContext, useEffect, useState } from 'react'
import { AppContext, UserType } from '../../../../context/AppContextProvider'

import classes from "./User.module.css"
import { Icon } from '@iconify/react'
import icons from '../../../../utils/icons'
import Popover from '../../../../components/Popover/Popover'
import { fmt } from '../../../../components/Table/Table'
import ButtonIconOnly from '../../../../components/ButtonIconOnly/ButtonIconOnly'
import { useParams } from 'react-router-dom'

const getUserRoleIcon = (role: "ROLE_USER" | "ROLE_MANAGER" | "ROLE_ADMIN") => {
    const roles = {
        "ROLE_ADMIN": <Icon className={classes.adminIcon} icon={icons.star} width={20} height={20} />,
        "ROLE_MANAGER": <Icon className={classes.managerIcon} icon={icons.manager} width={20} height={20} />,
    }

    if (!(role in roles)) {
        return null;
    }

    if (role === "ROLE_USER") {
        return null;
    }

    return (
        <Popover
            element={roles[role]}>
            {role}
        </Popover>
    )
}

const User = () => {

    const context = useContext(AppContext)
    const [user, setUser] = useState<UserType | null>(null)
    const { id } = useParams()

    const fetch = async () => {
        try {
            const response = await context.request!.get(`/user/${id}`)
            setUser(response.data)
        } catch (error) {
            console.error(error)
        }
    }

    useEffect(() => {
        fetch()
    }, [])

    if (user === null) {
        return null
    }

    return (
        <div className={classes.container}>
            <div className={classes.avaContainer}>
                <div className={classes.ava} />
            </div>
            <div className={classes.detailsContainer}>
                <p className={classes.login}>
                    <span>{user.login}</span>
                    {getUserRoleIcon(user.role!)}
                </p>
                <p className={classes.details}>
                    <span>Email</span>
                    {fmt(user.email)}
                </p>
                <p className={classes.details}>
                    <span>Name</span>
                    {fmt(user.firstname)}
                </p>
                <p className={classes.details}>
                    <span>Surname</span>
                    {fmt(user.lastname)}
                </p>
                <p className={classes.details}>
                    <span>Phone</span>
                    {fmt(user.phone)}
                </p>
            </div>
        </div>
    )
}

export default User