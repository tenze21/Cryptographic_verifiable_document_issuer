import Ajv from "ajv";

const ajv = new Ajv();


const schema = {
  "$id": "bcsea/v1.0",
    "type": "object",
    "default": {},
    "title": "Root Schema",
    "required": [
        "data"
    ],
    "properties": {
        "data": {
            "type": "object",
            "default": {},
            "title": "marksheet data",
            "required": [
                "student",
                "subjects",
                "supw",
                "result",
            ],
            "properties": {
                "student": {
                    "type": "object",
                    "default": {},
                    "title": "Student details",
                    "required": [
                        "indexNo",
                        "name",
                        "dob",
                        "school"
                    ],
                    "properties": {
                        "indexNo": {
                            "type": "string",
                            "default": "",
                            "title": "Student index number",
                            "examples": [
                                "0122344544"
                            ]
                        },
                        "name": {
                            "type": "string",
                            "default": "",
                            "title": "student name",
                            "examples": [
                                "Tenzin Choda"
                            ]
                        },
                        "dob": {
                            "type": "string",
                            "default": "",
                            "title": "Student dob",
                            "examples": [
                                "16/02/2003"
                            ]
                        },
                        "school": {
                            "type": "string",
                            "default": "",
                            "title": "school",
                            "examples": [
                                "Gaselo Central school"
                            ]
                        }
                    },
                    "examples": [{
                        "indexNo": "0122344544",
                        "name": "Tenzin Choda",
                        "dob": "16/02/2003",
                        "school": "Gaselo Central school"
                    }]
                },
                "subjects": {
                    "type": "array",
                    "default": [],
                    "title": "Subjects",
                    "items": {
                        "type": "object",
                        "default": {},
                        "title": "A Schema",
                        "required": [
                            "name",
                            "marks"
                        ],
                        "properties": {
                            "name": {
                                "type": "string",
                                "default": "",
                                "title": "subject name",
                                "examples": [
                                    "Math"
                                ]
                            },
                            "marks": {
                                "type": "string",
                                "default": "0",
                                "title": "Marks obtained by student",
                                "examples": [
                                    "99"
                                ]
                            }
                        },
                        "examples": [{
                            "name": "Math",
                            "marks": "99"
                        }]
                    },
                    "examples": [
                        [{
                            "name": "Math",
                            "marks": "99"
                        }]
                    ]
                },
                "supw": {
                    "type": "string",
                    "default": "",
                    "title": "student supw grade",
                    "examples": [
                        "A"
                    ]
                },
                "result": {
                    "type": "string",
                    "default": "",
                    "title": "result",
                    "examples": [
                        "Pass certificate awarded"
                    ]
                }
            },
            "examples": [{
                "student": {
                    "indexNo": "0122344544",
                    "name": "Tenzin Choda",
                    "dob": "16/02/2003",
                    "school": "Gaselo Central school"
                },
                "subjects": [{
                    "name": "Math",
                    "marks": "99"
                }],
                "supw": "A",
                "result": "Pass certificate awarded"
            }]
        },
        "targetHash": {
            "type": "string",
            "default": "",
            "title": "The targetHash Schema",
            "examples": [
                "cbd224a72af5e0050bd58ab2264094cbacac0f19f7f430e347cad451ae8c590d"
            ]
        },
        "proof": {
            "type": "array",
            "default": [],
            "title": "The proof Schema",
            "items": {},
            "examples": [
                []
            ]
        },
        "merkleRoot": {
            "type": "string",
            "default": "",
            "title": "The merkleRoot Schema",
            "examples": [
                "cbd224a72af5e0050bd58ab2264094cbacac0f19f7f430e347cad451ae8c590d"
            ]
        },
        "signature": {
            "type": "string",
            "default": "",
            "title": "The signature Schema",
            "examples": [
                "cbd224a72af5e0050bd58ab2264094cbacac0f19f7f430e347cad451ae8c590d"
            ]
        }
    },
    "examples": [{
        "data": {
            "student": {
                "indexNo": "0122344544",
                "name": "Tenzin Choda",
                "dob": "16/02/2003",
                "school": "Gaselo Central school"
            },
            "subjects": [{
                "name": "Math",
                "marks": "99"
            }],
            "supw": "A",
            "result": "Pass certificate awarded"
        },
        "targetHash": "cbd224a72af5e0050bd58ab2264094cbacac0f19f7f430e347cad451ae8c590d",
        "proof": [],
        "merkleRoot": "cbd224a72af5e0050bd58ab2264094cbacac0f19f7f430e347cad451ae8c590d",
        "signature": "cbd224a72af5e0050bd58ab2264094cbacac0f19f7f430e347cad451ae8c590d"
    }]
};

export const validate= ajv.compile(schema);
