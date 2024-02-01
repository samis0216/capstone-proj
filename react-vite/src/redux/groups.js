const LOAD_GROUPS = 'groups/loadGroups'
const CREATE_GROUP = 'groups/createGroup'

const loadUserGroups = (groups) => {
    return {
        type: LOAD_GROUPS,
        groups
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
        default:
            return state
    }
}

export default groupsReducer
