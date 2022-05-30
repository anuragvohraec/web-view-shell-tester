# Requirement doc
This document gives detail descriptions of native methods we want in our webview.
A global object **native** will be exposed to webview javascript environment. All methods will be attached to it.

## native.readPhonebook
**Purpose:** This function is called to read **all** contacts from user phone book.
```ts
//In our javascript this function will be called as 
let contacts:PhoneBookContact[] = await native.readPhonebook();
//this returns an array of values defined as such

//interface PhoneBookContact is defined as 
interface  PhoneBookContact{
	id:string,
	name:string,
	phone_number:string
}
```

## native.showFilePickerAndCompressThem
**Purpose:** This function is called to read files from user system. When this function gets called a Native file picker will be shown to user.

**NOTE**: Please do threads in this so that the UI do not freezes.

```ts

let input: FilePickerInput={
    inputMimeType:"video/*",
    maxFileAllowed: 3,
    themeHexColor: "#333333",
    outputQualities:[
        {
            bitrate: 1000000,
            maxVideoDimension:200,
            mimeType:"video/webm"
        },
        {
            bitrate: 1000000,
            maxVideoDimension:400,
            mimeType:"video/webm"
        }
    ]
};

let op:CompressedOutPut = await native.showFilePickerAndCompressThem(input);


//########Input Interface is defined as

interface FilePickerInput{
    /**
     * Unique ID passed by us
    */
    id:string;
    /**
     * this will control the theme color for file picker
     */
    themeHexColor: string,
    /**
     * This will decide how many files user can select. 
     * User should be shown toast if user select file more than this count.
     * Toast message : Only ${maxFileAllowed} files allowed
     */
    maxFileAllowed: number,
    /**
     * this will decide what kind of file user can select.
     * example: image/*: will select all images types, image/gif will only show gif files
     */
    inputMimeType: string,

    /**
     * For audio and video files this will be provided, for others it will be empty array
     * We will give an array of media qualities, so that we can do adaptive streaming for our videos.
     * Each media file will have multiple out
     */
    outputQualities:MediaQuality[];
}

//Media quality is defined as
interface MediaQuality{
    /**
     * For compressing audio and video file bit rate is required. 
     * Which decides the quality of compression.
     */
    bitrate:number;
    /**
     * For audio this value is zero.
     * 
     * For Video this value is used to reszie a video if 
     * the original video width/height is more than this than cropping is done.
     * 
     * Say this value is 400, and if a video is 1200x1000, than it will be resized to 400x333
     * For a video of size 400x300, no resizing is required only video compression will be done.
     */
    maxVideoDimension:number;

    mimeType:string;
}


//#######Compressed output is defined as
interface CompressedOutPut{
    id: string;
    blobs: BlobInfo[]
}

interface BlobInfo{
    fileName:string;
    file: Blob;
    fileSize:number;
    mime_type:string;
	/**
	 * width of output video, for other files this will be 0
	 */
	file_dimension:number;
    type:"video"|"audio"|"file"
}
```


## native.thermalPrint
Used to issue thermal print command to a connected bluetooth thermal
```ts
let isPrintDone:boolean = await native.thermalPrint(textToPrint,deviceid)
```

## native.pushNotifications
Is used to issue multiple notification on android phone
```ts
native.pushNotifications([{
	title:"hello",
	body:"Wow message is success",
	icon:"/icon/image.png",
	badge:"/icon/image.png"
}]);
```
