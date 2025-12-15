package zadanie13.lab13.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import zadanie13.lab13.model.Person;

@Repository
public interface PersonRepository extends JpaRepository<Person, Long> {
}
