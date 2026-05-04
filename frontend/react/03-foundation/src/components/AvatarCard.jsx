export default function AvatarCard({ avatar, level = "Rookie" }) {
  return (
    <article>
      <div>{avatar.initials}</div>
      <h3>{avatar.name}</h3>
      <p>{avatar.role}</p>
      <p>{avatar.power}</p>
      <p>Level: {level}</p>
    </article>
  );
}
