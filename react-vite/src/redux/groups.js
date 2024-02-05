const LOAD_GROUPS = 'groups/loadGroups'
const LOAD_ONE_GROUP = 'groups/loadOneGroup'
const CREATE_GROUP = 'groups/createGroup'
const DELETE_GROUP = 'groups/deleteGroup'
const UPDATE_GROUP = 'groups/updateGroup'

const loadUserGroups = (groups) => {
    return {
        type: LOAD_GROUPS,
        groups
    }
}

const loadOneGroup = (group) => {
    return {
        type: LOAD_ONE_GROUP,
        group
    }
}

const createGroup = (group) => {
    return {
        type: CREATE_GROUP,
        group
    }
}

const deleteGroup = (payload) => {
    return {
        type: DELETE_GROUP,
        payload
    }
}

const updateGroup = (group) => {
    return {
        type: UPDATE_GROUP,
        group
    }
}

export const loadUserGroupsThunk = (userId) => async (dispatch) => {
    const res = await fetch(`/api/users/${userId}/groups`)

    if (res.ok) {
        const data = await res.json()
        dispatch(loadUserGroups(data))
        return data
    }
}

export const loadOneGroupThunk = (userId, groupId) => async (dispatch) => {
    const res = await fetch(`/api/users/${userId}/groups/${groupId}`)

    if (res.ok) {
        const data = await res.json()
        dispatch(loadOneGroup(data))
        return data
    }
}

export const createGroupThunk = (userId, group) => async (dispatch) => {
    const res = await fetch(`/api/users/${userId}/groups`, {
        method: 'POST',
        body: group
    })

    if (res.ok) {
        const data = await res.json()
        dispatch(createGroup(data))
        return data
    }
}

export const deleteGroupThunk = (userId, groupId) => async (dispatch) => {
    const res = await fetch(`/api/users/${userId}/groups/${groupId}`, {
        method: 'DELETE',
        body: groupId
    })

    if (res.ok) {
        const data = await res.json()
        dispatch(deleteGroup(data))
        return data
    }
}

export const updateGroupThunk = (groupId, group) => async(dispatch) => {
    const res = await fetch(`/api/groups/${groupId}`, {
        method: 'PUT',
        body: group
    })

    if (res.ok) {
        const data = await res.json()
        dispatch(updateGroup(data))
        return data
    }
}

const initialState = {}

const groupsReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOAD_GROUPS: {
            const newState={}
            action.groups.forEach(group => {
                newState[group.id] = group
            });
            return newState
        }
        case LOAD_ONE_GROUP: {
            const newState = {}
            newState[action.group.id] = action.group
            return newState
        }
        case CREATE_GROUP: {
            const newState = {...state, [action.group.id]: action.group}
            return newState
        }
        case DELETE_GROUP: {
            const newState = {...state}
            delete newState[action.payload.id]
            return newState
        }
        case UPDATE_GROUP: {
            const newState = {}
            newState[action.group.id] = action.group
            return newState
        }
        default:
            return state
    }
}

export default groupsReducer
