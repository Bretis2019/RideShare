"use client"

import {useEffect, useState} from 'react'
import { Switch } from '@headlessui/react'

function MyToggle(props) {
    const [enabled, setEnabled] = useState(false)

    useEffect(() => {
        if(typeof props.enabled === 'boolean'){
            setEnabled(props.enabled);
        }
    }, []);

    useEffect(() => {
        props.handleClick(enabled);
    }, [enabled]);

    return (
        <Switch
            checked={enabled}
            onChange={setEnabled}
            disabled={props.disabled}
            className={`${
                enabled ? 'bg-blue-600' : 'bg-gray-200'
            } relative inline-flex h-6 w-11 items-center rounded-full`}
        >
            <span className="sr-only">Enable notifications</span>
            <span
                className={`${
                    enabled ? 'translate-x-6' : 'translate-x-1'
                } inline-block h-4 w-4 transform rounded-full bg-white transition`}
            />
        </Switch>
    )
}

export default function SettingsToggles(props){
    const {user} = props;

    const [oppositeGender, setOppositeGender] = useState(user.oppositeGender);
    const [sameGender, setSameGender] = useState(user.sameGender);
    const [sameUni, setSameUni] = useState(user.sameUni);
    const [sameHome, setSameHome] = useState(user.sameHome);

    useEffect(() => {
        console.log("fetch about to start");
        fetch('/api/profile-preferences', {
            method: 'POST',
            body: JSON.stringify({
                oppositeGender: oppositeGender,
                sameGender: sameGender,
                sameUni: sameUni,
                sameHome: sameHome
            })
        }).then(() => {
            console.log("fetched");
        })
            .catch(err => {console.log(err)});
    }, [oppositeGender,sameGender,sameUni,sameHome]);

    return (
        <div className={"flex flex-col space-y-4"}>
            <div>Matching preferences</div>
            <div className={"flex space-x-4"}>
                <div>Opposite Gender</div>
                <MyToggle disabled={sameGender} enabled={oppositeGender} handleClick={setOppositeGender}/>
            </div>
            <div className={"flex space-x-4"}>
                <div>Same Gender</div>
                <MyToggle disabled={oppositeGender} enabled={sameGender} handleClick={setSameGender}/>
            </div>
            <div className={"flex space-x-4"}>
                <div>Same University</div>
                <MyToggle enabled={sameUni} handleClick={setSameUni}/>
            </div>
            <div className={"flex space-x-4"}>
                <div>Same Hometown</div>
                <MyToggle enabled={sameHome} handleClick={setSameHome}/>
            </div>
        </div>
    )
}