import React, { useState } from "react";
import Axios from "axios";
import './_CardsForComments.scss';
import { ReactComponent as EditIcon } from '../../Assets/IconRef/edit.svg';
import { ReactComponent as BinIcon } from '../../Assets/IconRef/garbage.svg';
import { CardColumns, Card, CardImg, CardBody, CardTitle, CardSubtitle, Input, Button, Modal, ModalBody } from "reactstrap";
import { useDispatch, useSelector } from 'react-redux';
import { getPostsAction } from "../../redux/actions/postsActions";
import { API_URL } from "../../helper";

const CardsForComments = (props) => {

    const dispatch = useDispatch();

    let data = props.detail.comments

    const [selectedEdit, setSelectedEdit] = useState(0)
    const [selectedIdx, setSelectedIdx] = useState(null)
    const [openDelete, setOpenDelete] = useState(false)
    const [inputComment, setInputComment] = useState(data.comment);

    const currentDate = new Date();
    const latestDate = `${currentDate.getFullYear()}/${(currentDate.getMonth() + 1) < 10 ? `0${(currentDate.getMonth() + 1)}` : `${(currentDate.getMonth() + 1)}`}/${currentDate.getDate()}`

    // untuk dispatch post ulang supaya reducer keupdate
    const getPosts = () => {
        Axios.get(`${API_URL}/posts`)
            .then((response) => {
                dispatch(getPostsAction(response.data))
            }).catch((error) => {
                console.log(error)
            })
    }

    const handleSave = () => {
        // untuk patch comment dan editedDate
        console.log("yg ingin disave", inputComment)
        data[selectedIdx].comment = inputComment
        data[selectedIdx].editedDate = latestDate

        Axios.patch(`${API_URL}/posts/${props.detail.id}`, {
            comments: data
        }).then((res) => {
            console.log("isi res.data pas klik save", res.data)
            getPosts()
            setInputComment("")
        }).catch((err) => {
            console.log(err)
        })

        //untuk reset selectedIdx
        setSelectedIdx(null)
    }

    const handleDelete = (idx) => {
        setSelectedIdx(idx)
        setOpenDelete(!openDelete)
    }

    const confirmDelete = () => {
        //hapus dari props.detail.comments
        data.splice(selectedIdx, 1)

        //patching comments krn klo axios.delete hapus data post satu id langsung
        Axios.patch(`${API_URL}/posts/${props.detail.id}`, {
            comments: data
        }).then((res) => {
            console.log("isi res.data pas klik handlePost", res.data)
            getPosts()
            setSelectedIdx(null)
            setOpenDelete(!openDelete)
        }).catch((err) => {
            console.log(err)
        })
    }

    const handleCancelDelete = () => {
        setSelectedIdx(null);
        setOpenDelete(!openDelete)
    }

    const printCard = () => {
        return data.map((value, index) => {
            if (selectedIdx == index && openDelete == false) {
                return (
                    <CardColumns
                        key={value.id}
                        className="col-12"
                    >
                        <Card
                            className="_card_border"
                        >
                            <CardBody>
                                <span
                                    className="_card_detail_username"
                                >
                                    {value.username}
                                </span>
                                <Input
                                    type="text"
                                    className="mb-2"
                                    placeholder={value.comment}
                                    maxLength={300}
                                    onChange={(e) => setInputComment(e.target.value)}
                                />
                                <div
                                    className="d-md-flex justify-content-end"
                                >
                                    <Button
                                        className="col-12 col-md-2 mb-2 me-md-2"
                                        size="sm"
                                        color="success"
                                        onClick={handleSave}
                                    >
                                        Save
                                    </Button>
                                    <Button
                                        className="col-12 col-md-2 mb-2"
                                        size="sm"
                                        onClick={() => setSelectedIdx(null)}
                                    >
                                        Cancel
                                    </Button>
                                </div>
                            </CardBody>
                        </Card>
                    </CardColumns >
                )
            } else {
                return (
                    <CardColumns
                        key={value.id}
                        className="col-12"
                    >
                        <Card
                            className="_card_border"
                        >
                            <CardBody>
                                <span
                                    className="_card_detail_username"
                                >
                                    {value.username}
                                </span>
                                <span
                                    className="_card_detail_comment"
                                >
                                    {value.comment}
                                </span>
                                <br />
                                <span
                                    className="_card_detail_date me-2"
                                >
                                    {value.commentDate}
                                </span>
                                {
                                    value.username == props.loginUsername &&
                                    <>
                                        <EditIcon
                                            className="me-2"
                                            fill="#351c75"
                                            width="10px"
                                            height="10px"
                                            style={{ cursor: "pointer" }}
                                            onClick={() => setSelectedIdx(index)}
                                        />
                                        <BinIcon
                                            fill="#351c75"
                                            width="10px"
                                            height="10px"
                                            style={{ cursor: "pointer" }}
                                            onClick={() => handleDelete(index)}
                                        />
                                    </>
                                }
                            </CardBody>
                        </Card>
                    </CardColumns >
                )
            }
        }
        )
    }

    return (
        <div
            className="row"
        >
            <Modal
                isOpen={openDelete}
                toggle={() => setOpenDelete(!openDelete)}
                size="sm"
                centered
            >
                <ModalBody>
                    <span
                        className="me-1"
                    >Are you sure you want to delete this comment?</span>
                    <i>Deleted comment can't be returned.</i>
                    <div
                        className="d-flex justify-content-end align-items-center mt-2"
                    >
                        <Button
                            onClick={confirmDelete}
                            color="danger"
                            size="sm"
                            className="me-2"
                        >
                            Yes
                        </Button>
                        <Button
                            onClick={handleCancelDelete}
                            color="secondary"
                            size="sm"
                        >
                            No
                        </Button>
                    </div>
                </ModalBody>
            </Modal>
            {printCard()}

        </div>
    )

}

export default CardsForComments;