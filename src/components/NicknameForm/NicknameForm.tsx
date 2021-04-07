import React, { useEffect, useState } from 'react';
import "./NicknameForm.css"

function NicknameForm(props: { title: string, setNickname: (x: string) => void }) {

    return (
        <>
            <span>enter your github nickname</span>
            <input className="inputForm" type="text"  onChange={(e) => props.setNickname(e.target.value) } />
            <input className="submitButton" type="submit" value="ok" />
        </>
    );
}

export default NicknameForm;