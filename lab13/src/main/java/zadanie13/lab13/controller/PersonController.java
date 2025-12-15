package zadanie13.lab13.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;
import zadanie13.lab13.model.Person;
import zadanie13.lab13.repository.PersonRepository;

import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("/api/persons")
@CrossOrigin(origins = "http://localhost:53807") // Angular dev
public class PersonController {

    private final PersonRepository personRepository;

    public PersonController(PersonRepository personRepository) {
        this.personRepository = personRepository;
    }

    // GET /api/persons
    @GetMapping
    public List<Person> getAll() {
        return personRepository.findAll();
    }

    // GET /api/persons/{id}
    @GetMapping("/{id}")
    public Person getOne(@PathVariable Long id) {
        return personRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Person not found"));
    }

    // POST /api/persons
    @PostMapping
    public ResponseEntity<Person> create(@RequestBody Person person) {
        Person saved = personRepository.save(person);
        return ResponseEntity
                .created(URI.create("/api/persons/" + saved.getId())) 
                .body(saved);
    }

    // PUT /api/persons/{id}
    @PutMapping("/{id}")
    public ResponseEntity<Person> update(@PathVariable Long id, @RequestBody Person updated) {
        return personRepository.findById(id)
                .map(existing -> {
                    existing.setFirstName(updated.getFirstName());
                    existing.setFamilyName(updated.getFamilyName());
                    existing.setAge(updated.getAge());
                    existing.setAddress(updated.getAddress());
                    Person saved = personRepository.save(existing);
                    return ResponseEntity.ok(saved);
                })
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Person not found"));
    }

    // DELETE /api/persons/{id}
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        if (!personRepository.existsById(id)) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Person not found");
        }
        personRepository.deleteById(id);
        return ResponseEntity.noContent().build(); // 204
    }
}
