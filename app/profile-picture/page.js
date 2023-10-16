"use client"
import {useEffect, useState} from "react";
import {useSession} from "next-auth/react";
import {redirect} from "next/navigation";
import {useRouter} from "next/navigation";
import LoadingSpinner from "@/app/components/LoadingSpinner";

function GarbageCan(){
    return (
        <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" width="20px" height="20px" viewBox="0 0 40 40" enableBackground="new 0 0 40 40" xmlSpace="preserve" fill="#ffffff" stroke="#ffffff"><g id="SVGRepo_bgCarrier" strokeWidth={0} /><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round" /><g id="SVGRepo_iconCarrier"> <g display="none"> <path display="inline" d="M20.01,36.5c-0.277,0-0.537-0.137-0.693-0.368L9.468,21.529c-1.171-1.861-1.79-3.993-1.79-6.162 C7.678,8.824,13.206,3.5,20,3.5c6.795,0,12.322,5.324,12.322,11.867c0,2.164-0.612,4.284-1.77,6.129l-9.851,14.636 C20.547,36.363,20.287,36.5,20.01,36.5L20.01,36.5z M20,5.17c-5.873,0-10.652,4.574-10.652,10.197c0,1.854,0.525,3.669,1.52,5.251 l9.14,13.55l9.146-13.581c0.981-1.566,1.499-3.371,1.499-5.22C30.652,9.744,25.873,5.17,20,5.17L20,5.17z" /> <path display="inline" d="M20,20.857c-3.159,0-5.728-2.482-5.728-5.535c0-3.051,2.569-5.534,5.728-5.534s5.729,2.483,5.729,5.534 C25.729,18.375,23.158,20.857,20,20.857L20,20.857z M20,11.458c-2.237,0-4.057,1.734-4.057,3.864c0,2.13,1.82,3.865,4.057,3.865 s4.058-1.734,4.058-3.865C24.058,13.192,22.236,11.458,20,11.458L20,11.458z" /> </g> <path display="none" d="M36.705,34.289L26.059,23.615c3.918-4.69,3.688-11.708-0.707-16.114C23.1,5.243,20.104,4,16.919,4 S10.74,5.243,8.488,7.501c-4.647,4.66-4.647,12.241,0,16.899c2.253,2.257,5.248,3.5,8.431,3.5c2.866,0,5.573-1.015,7.728-2.86 l10.639,10.665C35.479,35.902,35.738,36,35.994,36s0.514-0.098,0.709-0.293C37.096,35.316,37.097,34.68,36.705,34.289z M9.766,23.126c-3.945-3.958-3.945-10.395,0-14.351c1.912-1.914,4.452-2.97,7.153-2.97s5.243,1.056,7.153,2.97 c3.946,3.956,3.946,10.394,0,14.351c-1.91,1.914-4.452,2.969-7.153,2.969S11.678,25.04,9.766,23.126z" /> <path display="none" d="M25.38,34.848c-0.066,0-0.136-0.009-0.206-0.024l-10.498-2.561l-10.61,2.561 c-0.069,0.016-0.139,0.024-0.205,0.024c-0.191,0-0.38-0.064-0.532-0.184C3.12,34.5,3,34.252,3,33.986V8.635 c0-0.397,0.27-0.741,0.657-0.836l10.76-2.623l0.407,0.003l10.504,2.558l10.607-2.561c0.065-0.016,0.135-0.023,0.203-0.023 c0.195,0,0.38,0.063,0.533,0.183C36.881,5.499,37,5.746,37,6.012v25.352c0,0.397-0.27,0.741-0.656,0.837l-10.759,2.622 C25.516,34.839,25.446,34.848,25.38,34.848L25.38,34.848z M15.481,30.688l9.039,2.203V9.311l-9.039-2.203V30.688z M26.24,9.311 v23.58l9.039-2.202V7.108L26.24,9.311z M4.721,9.311v23.58l9.039-2.202V7.108L4.721,9.311z" /> <g display="none"> <path display="inline" d="M9.708,35C7.112,35,5,32.893,5,30.303c0-2.592,2.112-4.699,4.708-4.699c2.595,0,4.707,2.107,4.707,4.699 C14.415,32.893,12.303,35,9.708,35L9.708,35z M9.708,27.445c-1.578,0-2.863,1.281-2.863,2.857c0,1.574,1.285,2.855,2.863,2.855 c1.578,0,2.861-1.281,2.861-2.855C12.568,28.727,11.285,27.445,9.708,27.445L9.708,27.445z" /> <path display="inline" d="M24.574,35c-0.621,0-1.125-0.505-1.125-1.126c0-9.552-7.771-17.324-17.323-17.324 C5.505,16.55,5,16.045,5,15.425s0.505-1.126,1.126-1.126c10.792,0,19.573,8.781,19.573,19.575C25.699,34.495,25.193,35,24.574,35 L24.574,35z" /> <path display="inline" d="M33.916,35c-0.597,0-1.082-0.486-1.082-1.084c0-14.75-12-26.751-26.751-26.751 C5.486,7.165,5,6.68,5,6.083C5,5.486,5.486,5,6.083,5C22.027,5,35,17.972,35,33.916C35,34.514,34.514,35,33.916,35L33.916,35z" /> </g> <g display="none"> <path display="inline" fillRule="evenodd" clipRule="evenodd" d="M20,29.616c-6.911,0-13.412-3.681-17-9.615 c3.588-5.935,10.089-9.617,17-9.617c6.91,0,13.412,3.682,17,9.617C33.412,25.936,26.91,29.616,20,29.616L20,29.616z M19.998,12.254 c-5.817,0-11.309,2.848-14.687,7.618l-0.088,0.125l0.088,0.124c3.378,4.77,8.87,7.618,14.687,7.618 c5.82,0,11.311-2.849,14.687-7.618l0.089-0.124l-0.089-0.125C31.309,15.103,25.818,12.254,19.998,12.254L19.998,12.254z" /> <path display="inline" fillRule="evenodd" clipRule="evenodd" d="M19.987,13.521c-3.574,0-6.478,2.9-6.478,6.479 c0,3.579,2.904,6.478,6.478,6.478c3.581,0,6.478-2.898,6.478-6.478C26.465,16.42,23.568,13.521,19.987,13.521z M19.987,24.857 c-2.68,0-4.858-2.175-4.858-4.858s2.178-4.859,4.858-4.859c2.686,0,4.858,2.175,4.858,4.859S22.673,24.857,19.987,24.857z" /> </g> <path display="none" d="M7.336,35.5c-0.399,0-0.725-0.325-0.725-0.726v-7.599c0-0.4,0.326-0.725,0.725-0.725h3.181v-6.336 c0-0.342,0.276-0.619,0.619-0.619h8.247v-5.949h-3.181c-0.398,0-0.725-0.325-0.725-0.726V5.223c0-0.399,0.326-0.723,0.725-0.723 h7.598c0.398,0,0.725,0.324,0.725,0.723v7.599c0,0.401-0.326,0.726-0.725,0.726H20.62v5.949h8.245c0.341,0,0.618,0.277,0.618,0.619 v6.336h3.182c0.397,0,0.724,0.324,0.724,0.725v7.599c0,0.399-0.326,0.725-0.724,0.725h-7.599c-0.4,0-0.726-0.325-0.726-0.725v-7.599 c0-0.4,0.325-0.725,0.726-0.725h3.179v-5.717H11.754v5.717h3.18c0.399,0,0.725,0.324,0.725,0.725v7.599 c0,0.4-0.325,0.726-0.725,0.726H7.336z M8.061,34.051h6.149V27.9H8.061V34.051z M25.79,34.051h6.149V27.9H25.79V34.051z M16.927,12.099h6.146V5.949h-6.146V12.099z" /> <g> <path d="M11.018,35.01c-0.402,0-0.736-0.314-0.759-0.717L8.879,9.946H5.75c-0.419,0-0.76-0.342-0.76-0.76 c0-0.419,0.341-0.761,0.76-0.761h3.59L9.495,8.45L9.6,8.426h5.171V5.75c0-0.419,0.34-0.76,0.76-0.76h8.939 c0.419,0,0.76,0.341,0.76,0.76v2.676h5.174l0.175,0.028l0.118-0.028h3.554c0.419,0,0.76,0.342,0.76,0.761 c0,0.418-0.341,0.76-0.76,0.76h-3.128l-1.36,24.346c-0.023,0.402-0.356,0.718-0.759,0.718H11.018z M11.735,33.49h16.549L29.6,9.946 H10.4L11.735,33.49z M16.29,8.426h7.42V6.51h-7.42V8.426z" /> <path d="M14.302,12.201c-0.249,0.012-0.435,0.102-0.57,0.252c-0.135,0.152-0.203,0.348-0.192,0.551l0.998,17.608 c0.024,0.401,0.357,0.716,0.759,0.716v0.19l0.045-0.19c0.417-0.024,0.737-0.385,0.715-0.804l-0.999-17.606 C15.034,12.516,14.702,12.201,14.302,12.201L14.302,12.201z" /> <path d="M25.709,12.202c-0.445,0-0.776,0.314-0.8,0.716l-1,17.606c-0.022,0.419,0.298,0.779,0.717,0.804l0.044,0.19v-0.19 c0.402,0,0.735-0.314,0.757-0.716l1.001-17.608c0.011-0.203-0.058-0.398-0.192-0.551c-0.136-0.15-0.321-0.24-0.523-0.251 C25.711,12.202,25.71,12.202,25.709,12.202L25.709,12.202z" /> <path d="M20,12.201c-0.419,0-0.76,0.341-0.76,0.76v17.607c0,0.419,0.341,0.76,0.76,0.76s0.76-0.341,0.76-0.76V12.961 C20.76,12.542,20.419,12.201,20,12.201L20,12.201z" /> </g> </g></svg>
    )
}

export default function Images(){

    const session = useSession({
        required: true,
        onUnauthenticated() {
            redirect('/signin');
        },
    });

    const [image, setImage] = useState(null);
    const [loading, setLoading] = useState(false);
    const [url, setUrl] = useState(null);
    const router = useRouter();
    useEffect(() => {
        if(image){
            setUrl(URL.createObjectURL(image))
        }
    }, [image]);

    async function handleClick(){
        setLoading(true);
        const data = new FormData();
        data.set('image', image);
        data.append('name', image.name);

        fetch('/api/profile-picture', {
            method: 'POST',
            body: data
        }).then(response => response.json())
            .then(data => {
                if(data.status === 200){
                    router.push('/aboutme')
                }
                setLoading(false);
            }).catch(err => {console.log(err)});
    }

    return (
        <>
            <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <img
                        className="mx-auto h-10 w-auto rounded-full"
                        src="/logo.png"
                        alt="Your Company"
                    />
                    <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-white">
                        Upload a profile picture
                    </h2>
                </div>

                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <div className="space-y-6">

                        {image ?
                            <div className={"flex justify-center"}>
                                <img className={"h-80 object-contain rounded-xl"} src={url} key={url} alt={"image"} />
                            </div> :
                            <div className="flex items-center justify-center w-full">
                                <label htmlFor="dropzone-file"
                                       className="flex flex-col items-center justify-center h-80 w-80 rounded-full border-2 border-gray-300 border-dashed cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                        <svg className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true"
                                             xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"
                                                  strokeWidth="2"
                                                  d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
                                        </svg>
                                        <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span
                                            className="font-semibold">Click to upload</span> or drag and drop</p>
                                        <p className="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF</p>
                                    </div>
                                    <input onChange={(e) => {setImage(e.target.files[0])}} id="dropzone-file" type="file" accept={"image"} className="hidden"/>
                                </label>
                            </div>}


                        <div className={"flex gap-x-1"}>
                            <button
                                onClick={handleClick}
                                disabled={!image}
                                className="disabled:opacity-40 flex w-full justify-center rounded-md bg-indigo-500 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
                            >
                                {loading ? <LoadingSpinner /> : "Submit"}
                            </button>
                            <button
                                onClick={() => setImage(null)}
                                disabled={!image}
                                className="disabled:opacity-40 flex w-fit justify-center rounded-md bg-gray-500 px-8 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-gray-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-500"
                            >
                                <GarbageCan />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}