import React, { useEffect, useState } from "react";
import '../../index.scss';
import Axios from "axios";
import './_CardsForComments.scss';
import { ReactComponent as EditIcon } from '../../Assets/IconRef/edit.svg';
import { ReactComponent as BinIcon } from '../../Assets/IconRef/garbage.svg';
import { CardColumns, Card, CardBody, Input, Button, Modal, ModalBody } from "reactstrap";
import { useDispatch, useSelector } from 'react-redux';
import { getCommentsAction } from "../../redux/actions/commentsActions";
import { API_URL } from "../../helper";
import InfiniteScroll from 'react-infinite-scroll-component';

const CardsForComments = (props) => {

    const dispatch = useDispatch();

    const [selectedIdx, setSelectedIdx] = useState(null);
    const [openDelete, setOpenDelete] = useState(false);
    
    const { commentsFiltered } = useSelector((state) => {
        return {
            commentsFiltered: state.commentsReducer.comments.filter(val=>val.postId == props.query)
        }
    })

    let data = [...props.commentsArr];
    console.log("isi props.commentsArr terbaru", data);

    console.log("isi commentsFiltered",commentsFiltered)

    // const [data, setData] = useState([])

    // useEffect(()=>{
    //     setData([...props.commentsArr])
    // },[])

    const [inputComment, setInputComment] = useState("");

    const currentDate = new Date();
    const latestDate = `${currentDate.getFullYear()}/${(currentDate.getMonth() + 1) < 10 ? `0${(currentDate.getMonth() + 1)}` : `${(currentDate.getMonth() + 1)}`}/${currentDate.getDate()}`;

    // untuk dispatch comment ulang supaya reducer keupdate
    const getComments = () => {
        Axios.get(`${API_URL}/comments`)
            .then((res) => {
                dispatch(getCommentsAction(res.data))
                // setData([...props.commentsArr])
            }).catch((err) => {
                console.log(err)
            })
    }

    const handleSave = () => {
        // console.log("yg ingin disave", inputComment)
        data[selectedIdx].comment = inputComment
        data[selectedIdx].editedDate = latestDate

        Axios.patch(`${API_URL}/comments/${props.commentsArr[selectedIdx].id}`, {
            comment: inputComment,
            editedDate: latestDate //pas konek ke express API ini bisa didelete
        }).then((res) => {
            console.log("isi res.data pas klik save", res.data)
            getComments()
            setInputComment("")
        }).catch((err) => {
            console.log(err)
        })

        setSelectedIdx(null)
    }

    const handleDelete = (idx) => {
        setSelectedIdx(idx)
        setOpenDelete(!openDelete)
    }

    const confirmDelete = () => {
        data.splice(selectedIdx, 1)

        Axios.delete(`${API_URL}/comments/${props.commentsArr[selectedIdx].id}`).
            then((res) => {
                getComments()
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
                return (<CardColumns
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
                                className="mb-2 _card_font"
                                placeholder={value.comment}
                                maxLength={300}
                                onChange={(e) => setInputComment(e.target.value)}
                            />
                            <div
                                className="d-md-flex justify-content-end"
                            >
                                <Button
                                    className="col-12 col-md-2 mb-2 me-md-2 _card_button"
                                    size="sm"
                                    color="warning"
                                    outline
                                    onClick={handleSave}
                                >
                                    Save
                                </Button>
                                <Button
                                    className="col-12 col-md-2 mb-2 _card_button"
                                    size="sm"
                                    color="secondary"
                                    outline
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
                return (<CardColumns
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

    console.log("isi hasMore",props.hasMore)

    return (
        <div
            id="scrollableDiv"
            style={{ height: 150, overflow: "auto" }}
        >
            <Modal
                isOpen={openDelete}
                toggle={() => setOpenDelete(!openDelete)}
                size="sm"
                centered
            >
                <ModalBody>
                    <span
                        className="me-1 gen_font_content"
                    >Are you sure you want to delete this comment?</span>
                    <i>Deleted comment can't be returned.</i>
                    <div
                        className="d-flex justify-content-end align-items-center mt-2"
                    >
                        <Button
                            onClick={confirmDelete}
                            color="warning"
                            outline
                            size="sm"
                            className="me-2 gen_btn_warning_secondary"
                        >
                            Yes
                        </Button>
                        <Button
                            onClick={handleCancelDelete}
                            color="secondary"
                            outline
                            size="sm"
                            className="gen_btn_warning_secondary"
                        >
                            No
                        </Button>
                    </div>
                </ModalBody>
            </Modal>
            <InfiniteScroll
                dataLength={data.length}
                // dataLength={commentsFiltered.length}
                next={props.fetchData}                hasMore={props.hasMore}
                loader={commentsFiltered.length === 0
                    ?
                    <p
                        style={{ textAlign: "center" }}
                        className="gen_font_content"
                    >No comment(s) yet</p>
                    :
                    <p
                        style={{ textAlign: "center" }}
                        className="gen_font_content"
                    >Loading...</p>
                }
                endMessage={<p
                    style={{ textAlign: "center" }}
                    className="gen_font_content"
                >End of comment(s)...</p>}
                scrollableTarget="scrollableDiv"
            >
                <div
                    className="row"
                >
                    {printCard()}
                </div>
            </InfiniteScroll>

        </div>
    )

}

export default CardsForComments;