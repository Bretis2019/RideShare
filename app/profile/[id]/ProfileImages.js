"use client"
import React from "react";
import Carousel from "react-instagram-carousel";

export default function ProfileImages(props){
    return (
        <Carousel images={props.images} backgroundSize={'cover'} nextMsec={999999999}/>
    )
}