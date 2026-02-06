interface ProfileButtonProps {
    nameButton?: string
}

export default function ProfileButton({nameButton}: ProfileButtonProps) {
    return (
        <button>
            {nameButton ? nameButton : 'Sem Nome'}
        </button>
    )
}