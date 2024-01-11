import { Button, Timeline } from 'flowbite-react';
import { HiArrowNarrowRight } from 'react-icons/hi';
import { NavLink } from 'react-router-dom';

function IndexComponent() {
  return (
    <Timeline>
      <Timeline.Item>
        <Timeline.Point />
        <Timeline.Content>
          <Timeline.Time>Today</Timeline.Time>
          <Timeline.Title>Join our community</Timeline.Title>
          <Timeline.Body>
            Get a new experience in managing your to-do list with our Todo list web. Free and easy to use!
          </Timeline.Body>
          <NavLink to="/login">
          <Button color="gray">
           Login
            <HiArrowNarrowRight className="ml-2 h-3 w-3" />
          </Button>
          </NavLink>
        </Timeline.Content>
      </Timeline.Item>
      <Timeline.Item>
        <Timeline.Point />
        <Timeline.Content>
          <Timeline.Time>Why Not?</Timeline.Time>
          <Timeline.Title>Accomplishing many things</Timeline.Title>
          <Timeline.Body>
            Our Todo list web is the right solution for those of you who want to manage your to-do list more easily and effectively.
          </Timeline.Body>
        </Timeline.Content>
      </Timeline.Item>
      <Timeline.Item>
        <Timeline.Point />
        <Timeline.Content>
          <Timeline.Time>Start Now!</Timeline.Time>
          <Timeline.Title>what are you still thinking?</Timeline.Title>
          <Timeline.Body>
            With our Todo list web, you can manage your to-do list more efficiently and organized. Join now and experience the benefits!
          </Timeline.Body>
        </Timeline.Content>
      </Timeline.Item>
    </Timeline>
  );
}

export default IndexComponent;
