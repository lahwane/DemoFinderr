import { GigPreview } from "./Explore/GigPreview";

export function GigList({ gigs }) {
    return (
        <ul className="gig-list">
            {gigs.map(gig =>
                <li key={gig._id}>
                    <GigPreview gig={gig} />
                </li>
            )}
        </ul>
    )
}