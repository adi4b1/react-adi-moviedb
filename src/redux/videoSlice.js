import {createSlice,createAsyncThunk} from '@reduxjs/toolkit'

const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5N2NkMWY2ZDIwMjRkZjQ1NzM2MDJlYTQ3Nzg2OTg0NCIsIm5iZiI6MTczMDEzMDczNi4xMjU0MDMsInN1YiI6IjYzY2EzYzAwYmIwNzBkMDA4NGU0NDQ0OCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.LN4QQmKfMYHHIR7bpgrlM6RCpyPY4w0wQ9qpIHgOjIU'
    }
  };

export const fetchVideos=createAsyncThunk(
    'videos/fetchVideos',
    async(id)=>{
        const response=await fetch(`https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`,options)
        // console.log(response.json());
        
        return response.json()
    }
)

const videoSlice=createSlice({
    name:'fetchVideos',
    initialState:{
        videos:[],
        status:'idle',
        error:null,
    },
    reducers:{
        
    },
    extraReducers:(builder)=>{
        builder
        .addCase(fetchVideos.pending,(state)=>{
            state.status="loading";
        })
        .addCase(fetchVideos.fulfilled,(state,action)=>{
            state.status="succeeded"
            state.videos=action.payload
        })
        .addCase(fetchVideos.rejected,(state,action)=>{
            state.status="rejected"
            state.error=action.error.message
        })
    }
})


export default videoSlice.reducer

