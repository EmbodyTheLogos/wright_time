package edu.team5.wright_time.controller;

import edu.team5.wright_time.model.entity.Certification;
import edu.team5.wright_time.model.repository.CertificationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.NoSuchElementException;

@RestController
@RequestMapping("/api/certifications")
@CrossOrigin(origins = "http://localhost:3000")
public class CertificationController {
    private final CertificationRepository certificationRepository;

    @Autowired
    public CertificationController(CertificationRepository certificationRepository) {
        this.certificationRepository = certificationRepository;
    }

    @GetMapping
    @Secured({ "ROLE_STUDENT", "ROLE_INSTRUCTOR", "ROLE_ADMIN" })
    public Iterable<Certification> getCertifications(){
        return certificationRepository.findAll();
    }

    @GetMapping("/{id}")
    @Secured({ "ROLE_STUDENT", "ROLE_INSTRUCTOR", "ROLE_ADMIN" })
    public Certification getOneCertification(@PathVariable long id) throws NoSuchElementException {
        return certificationRepository.findById(id).orElseThrow(() -> new NoSuchElementException("No certification with id: " + id));
    }

    @PostMapping
    @Secured("ROLE_ADMIN")
    public Certification addCertification(@RequestBody @Valid Certification certification) {
        return certificationRepository.save(certification);
    }

    @PutMapping("/{id}")
    @Secured("ROLE_ADMIN")
    public Certification updateCertification(@PathVariable long id, @RequestBody @Valid Certification certification) {
        return certificationRepository.findById(id).map(toUpdate -> {
            toUpdate.setDateObtained(certification.getDateObtained());
            toUpdate.setUser(certification.getUser());
            toUpdate.setAircraft(certification.getAircraft());
            return certificationRepository.save(toUpdate);
        }).orElseThrow(() -> new NoSuchElementException("No certification with id: " + id));
    }

    @DeleteMapping("/{id}")
    @Secured("ROLE_ADMIN")
    public void deleteCertification(@PathVariable long id) {
        certificationRepository.deleteById(id);
    }

}

