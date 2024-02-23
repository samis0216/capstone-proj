const LOAD_GROUP_MEMBERS = 'groupMembers/loadGroupMembers'
const CREATE_GROUP_MEMBER = 'groupMembers/createGroupMember'
// const DELETE_GROUP_MEMBER = 'groupMembers/deleteGroupMember'

const loadGroupMembers = (members) => {
    return {
        type: LOAD_GROUP_MEMBERS,
        members
    }
}

const createGroupMember = (member) => {
    return {
        type: CREATE_GROUP_MEMBER,
        member
    }
}

export const loadGroupMembersThunk = groupId => async (dispatch) => {
    const res = await fetch(`/api/groups/${groupId}/members`)

    if (res.ok) {
        const data = await res.json()
        dispatch(loadGroupMembers(data))
        return data
    }
}

export const createGroupMemberThunk = (data) => async (dispatch) => {
    const res = await fetch(`/api/groups/members/new`, {
        method: 'POST',
        body: data
    })

    if (res.ok) {
        const data = await res.json()
        dispatch(createGroupMember(data))
        return data
    }
}

const initialState = {}

const groupMembersReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOAD_GROUP_MEMBERS: {
            const newState = {}
            action.members.forEach(member => {
                newState[member.id] = member
            })
            return newState
        }
        case CREATE_GROUP_MEMBER: {
            const newState = {...state}
            newState[action.member.id] = action.member
            return newState
        }
        default:
            return state
    }
}

export default groupMembersReducer
