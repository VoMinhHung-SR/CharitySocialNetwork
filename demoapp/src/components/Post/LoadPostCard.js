import React, { useContext, useEffect, useState } from 'react';
import { useSearchParams } from "react-router-dom";
import { Box, Pagination, Skeleton, Stack } from '@mui/material'
import APIs, { authApi, endpoints } from '../../configs/APIs'
import PostCard from '../PostCard';
import { userContext } from '../../App';




const LoadPostCard = () => {

    // ====== QuerySet ======
    const [q] = useSearchParams();

    // ====== Pagination ======
    const [isLoadingPosts, setIsLoadingPosts] = useState(true);
    const [pagination, setPagination] = useState({ count: 0, sizeNumber: 0 });
    const [page, setPage] = useState(1);
    const handleChangePage = (event, value) => {
        setPage(value);
    };
    // ====== FetchAPI ======

    const [flag, setFlag] = useState(false)
    const handleChangeFlag = () => {
        setFlag(!flag)
    }

    const [posts, setPosts] = useState([])
    const [user] = useContext(userContext);



    useEffect(() => {
        const loadPosts = async () => {
            try {
                let query = q.toString();

                query === "" ? (query += `page=${page}`) : (query += `&page=${page}`);
                console.info("query: " + query);
                let res;
                if (user !== null && user !== undefined) {
                    res = await authApi().get(`${endpoints['posts']}?${query}`);
                } else {
                    res = await APIs.get(`${endpoints['posts']}?${query}`);
                }

                const data = await res.data;
                setPosts(data.results);

                console.log(data.results);
                setPagination({
                    count: data.count,
                    sizeNumber: Math.ceil(data.count / 2),
                });
                setIsLoadingPosts(false);
                // console.log("load thành công")
            } catch (err) {
                console.error(err);
            }

        };

        loadPosts()

    }, [q, page, flag])

    return (
        <>
            {isLoadingPosts && posts.length === 0 ? (
                <Box>
                    <Skeleton variant="text" />
                    <Skeleton variant="circular" width={40} height={40} />
                    <Skeleton variant="rectangular" width={210} height={118} />
                </Box>

            ) : posts.length === 0 ? (
                <h1>Không tìm thấy bài viết</h1>
            ) : (
                posts.map((post) => (
                    <PostCard
                        id={post.id}
                        key={post.id}
                        title={post.title}
                        image={post.image_path}
                        description={post.description}
                        tags={post.tags.map(t => <span>#{t.name} </span>)}
                        createdDate={post.created_date}
                        avatar={post.author.avatar}
                        authorUserName={post.author.username}
                        // like status
                        authorID={post.author.id}
                        like={post.like}
                        // click delete post
                        clickDeletePost={handleChangeFlag}
                    />
                ))
            )}
            {pagination.sizeNumber >= 2 && (
                <Box sx={{ pt: 5, pb: 2 }}>
                    <Stack>
                        <Pagination
                            count={pagination.sizeNumber}
                            variant="outlined"
                            sx={{ margin: "0 auto" }}
                            page={page}
                            onChange={handleChangePage}
                        />
                    </Stack>
                </Box>
            )}
        </>
    )
}
export default LoadPostCard

