package zadanie13.lab13.model;

import jakarta.persistence.*;

@Entity
public class Person {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String firstName;
    private String familyName;
    private Integer age;

    @Embedded
    private Address address = new Address();

    public Person() {
    }

    public Person(String firstName, String familyName, Integer age, Address address) {
        this.firstName = firstName;
        this.familyName = familyName;
        this.age = age;
        this.address = address;
    }

    public Long getId() {
        return id;
    }

    // brak setId – generowane przez bazę / JPA

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getFamilyName() {
        return familyName;
    }

    public void setFamilyName(String familyName) {
        this.familyName = familyName;
    }

    public Integer getAge() {
        return age;
    }

    public void setAge(Integer age) {
        this.age = age;
    }

    public Address getAddress() {
        if (address == null) {
            address = new Address();
        }
        return address;
    }

    public void setAddress(Address address) {
        this.address = address;
    }
}
